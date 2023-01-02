import { Config, MetaData } from "./../types";
import { ChessMove } from "../models/chessMoves";
import { squareService } from "./squareService";
import { Square, SquareObject } from "../hooks/square";

let fullLength = [1, 2, 3, 4, 5, 6, 7, 8];

const prepareN1Moves = (
    move: ChessMove,
    metaData: MetaData,
    config: Config
): SquareObject[] => {
    let moves = [] as SquareObject[];

    // if (move.x === "n1" && move.y === "n1") {
    //     let finalSquare = metaData.square;

    //     for (const number of fullLength) {
    //         let firstWay = finalSquare + number + number * 10;
    //         if (!squareService.validateSquare(firstWay)) break;

    //         if (squareService.isLocatedOnAnotherPiece(firstWay)) {
    //             moves.push(firstWay);
    //             break;
    //         }

    //         moves.push(firstWay);
    //     }

    //     for (const number of fullLength) {
    //         let firstWay = finalSquare - number - number * 10;
    //         if (!squareService.validateSquare(firstWay)) break;

    //         if (squareService.isLocatedOnAnotherPiece(firstWay)) {
    //             moves.push(firstWay);
    //             break;
    //         }

    //         moves.push(firstWay);
    //     }

    //     for (const number of fullLength) {
    //         let firstWay = finalSquare + number - number * 10;
    //         if (!squareService.validateSquare(firstWay)) break;

    //         if (squareService.isLocatedOnAnotherPiece(firstWay)) {
    //             moves.push(firstWay);
    //             break;
    //         }

    //         moves.push(firstWay);
    //     }

    //     for (const number of fullLength) {
    //         let firstWay = finalSquare - number + number * 10;
    //         if (!squareService.validateSquare(firstWay)) break;

    //         if (squareService.isLocatedOnAnotherPiece(firstWay)) {
    //             moves.push(firstWay);
    //             break;
    //         }

    //         moves.push(firstWay);
    //     }
    // }

    return moves;
};

const prepareNMoves = (
    move: ChessMove,
    metaData: MetaData,
    config: Config
): SquareObject[] => {
    let moves = [] as SquareObject[];

    if (move.x === "n" && move.y === "n") {
        console.log("handle special case");
        return moves;
    }

    if (move.x !== "n" && move.y !== "n") {
        console.log("Cannot have both x and y as n");
        return moves;
    }

    const handleVertical = move.y === "n";
    const square = Square(metaData.square);

    let tempSquare = square.getSquare();

    const handleSquare = (square: SquareObject, callback) => {
        while (true) {
            square = callback(square);

            if (square?.isOutsideBoard() || square === null) {
                break;
            }

            console.log({
                isOnPiece: square.isOnPiece(),
                isOutsideBoard: square.isOutsideBoard(),
                isOnEndSquare: square.isOnEndOfBoard(),
            });

            if (square.isOnPiece()) {
                moves.push(square.getSquare());
                break;
            }

            moves.push(square.getSquare());
        }
    };

    if (handleVertical) {
        handleSquare(tempSquare, (square) => square.increaseLast());
        handleSquare(tempSquare, (square) => square.decreaseLast());
    } else {
        handleSquare(tempSquare, (square) => square.increaseFirst());
        handleSquare(tempSquare, (square) => square.decreaseFirst());
    }

    return moves;
};

const preparePawnMove = (
    move: ChessMove,
    metaData: MetaData,
    config: Config
): SquareObject => {
    let square = Square(metaData.square);
    const isWhitePlayerAndWhitePiece = config.playerIsWhite && metaData.isWhite;

    if (move.x !== 0 && Number.isInteger(move.x)) {
        let x = move.x as number;
        if (metaData.type === "pawn" && !isWhitePlayerAndWhitePiece) {
            square.decreaseLast();
        } else {
            square.increaseLast;
        }
    }

    if (move.y !== 0 && Number.isInteger(move.y)) {
        let y = move.y as number;

        if (metaData.type === "pawn" && !isWhitePlayerAndWhitePiece) {
            square.decreaseFirst();
        } else {
            square.increaseFirst();
        }
    }

    return square;
};

const moves: SquareObject[] = [];

const addMoves = (square: SquareObject | SquareObject[]) => {
    const validate = (square: SquareObject) => {
        // if (!squareService.validateSquare(square)) return;
        moves.push(square);
    };

    if (Array.isArray(square)) {
        square.forEach(validate);
        return;
    }

    validate(square);
};

const getMoves = () => {
    return moves;
};

const clearMoves = () => {
    moves.length = 0;
};

export const moveService = {
    preparePawnMove,
    addMoves,
    getMoves,
    clearMoves,
    prepareNMoves,
    prepareN1Moves,
};
