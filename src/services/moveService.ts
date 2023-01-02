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

    // const xIsInfinite = move.x === "n";
    // const square = Square(metaData.square);

    // const AMOUNT_OF_MOVES = 2;
    // const allMoves = (square: SquareObject) => {
    //     const allMoves = [
    //         () => square.increaseFirst(),
    //         () => square.increaseLast(),
    //     ];
    //     return allMoves;
    // };

    // for (let i = 1; i <= AMOUNT_OF_MOVES; i++) {
    //     let tempSquare = square.getSquare();
    //     const moves = allMoves(tempSquare);
    //     console.log(i, moves);

    //     while (true) {
    //         console.log(moves);
    //         const callback = moves[i];
    //         tempSquare = callback();

    //         if (tempSquare?.isOutsideBoard() || tempSquare === null) {
    //             console.log("outside board");
    //             break;
    //         }

    //         if (tempSquare.isOnPiece()) {
    //             console.log("is on another piece");
    //             moves.push(tempSquare.getSquare());
    //             break;
    //         }

    //         moves.push(tempSquare.getSquare());
    //     }
    // }

    // movesToDo.forEach((callback) => {
    //     let tempSquare = square.getSquare();

    //     while (true) {
    //         tempSquare = callback();
    //         console.log(tempSquare?.getCurrent());
    //         console.log("square:", square?.getCurrent());

    //         if (tempSquare?.isOutsideBoard() || tempSquare === null) {
    //             console.log("outside board");
    //             break;
    //         }

    //         if (tempSquare.isOnPiece()) {
    //             console.log("is on another piece");
    //             moves.push(tempSquare.getSquare());
    //             break;
    //         }

    //         moves.push(tempSquare.getSquare());
    //     }
    // });

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
