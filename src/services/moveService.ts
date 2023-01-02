import { Config, MetaData } from "./../types";
import { ChessMove } from "../models/chessMoves";
import { squareService } from "./squareService";

let fullLength = [1, 2, 3, 4, 5, 6, 7, 8];

const prepareN1Moves = (
    move: ChessMove,
    metaData: MetaData,
    config: Config
): number[] => {
    let moves = [] as number[];

    if (move.x === "n1" && move.y === "n1") {
        let finalSquare = metaData.square;

        for (const number of fullLength) {
            let firstWay = finalSquare + number + number * 10;
            if (!squareService.validateSquare(firstWay)) break;

            if (squareService.isLocatedOnAnotherPiece(firstWay)) {
                moves.push(firstWay);
                break;
            }

            moves.push(firstWay);
        }

        for (const number of fullLength) {
            let firstWay = finalSquare - number - number * 10;
            if (!squareService.validateSquare(firstWay)) break;

            if (squareService.isLocatedOnAnotherPiece(firstWay)) {
                moves.push(firstWay);
                break;
            }

            moves.push(firstWay);
        }

        for (const number of fullLength) {
            let firstWay = finalSquare + number - number * 10;
            if (!squareService.validateSquare(firstWay)) break;

            if (squareService.isLocatedOnAnotherPiece(firstWay)) {
                moves.push(firstWay);
                break;
            }

            moves.push(firstWay);
        }

        for (const number of fullLength) {
            let firstWay = finalSquare - number + number * 10;
            if (!squareService.validateSquare(firstWay)) break;

            if (squareService.isLocatedOnAnotherPiece(firstWay)) {
                moves.push(firstWay);
                break;
            }

            moves.push(firstWay);
        }
    }

    return moves;
};

const prepareNMoves = (
    move: ChessMove,
    metaData: MetaData,
    config: Config
): number[] => {
    let moves = [] as number[];

    if (move.x === "n" && move.y === "n") {
        console.log("handle special case");
    } else if (move.x === "n" || move.y === "n") {
        const xIsInfinite = move.x === "n";
        const startSquare = Number(metaData.square);

        for (let number of fullLength) {
            let finalSquare = startSquare.toString();

            if (xIsInfinite) {
                finalSquare = number.toString() + finalSquare.slice(1);
            } else {
                finalSquare = finalSquare.slice(0, -1) + number.toString();
            }

            if (startSquare.toString() === finalSquare) continue;
            if (!squareService.validateSquare(finalSquare)) continue;
            if (squareService.isLocatedOnAnotherPiece(Number(finalSquare)))
                continue;

            moves.push(Number(finalSquare));
        }
    }

    return moves;
};

const preparePawnMove = (
    move: ChessMove,
    metaData: MetaData,
    config: Config
): number => {
    let square = Number(metaData.square);
    const isWhitePlayerAndWhitePiece = config.playerIsWhite && metaData.isWhite;

    if (move.x !== 0 && Number.isInteger(move.x)) {
        let x = move.x as number;
        if (metaData.type === "pawn" && !isWhitePlayerAndWhitePiece) {
            square = square - x * 10;
        } else {
            square = square + x * 10;
        }
    }

    if (move.y !== 0 && Number.isInteger(move.y)) {
        let y = move.y as number;

        if (metaData.type === "pawn" && !isWhitePlayerAndWhitePiece) {
            square = square - y;
        } else {
            square = square + y;
        }
    }

    return square;
};

const moves = [];

const addMoves = (square: number | number[]) => {
    const validate = (square: number) => {
        if (!squareService.validateSquare(square)) return;
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
