import { Config, MetaData } from "./../types";
import { ChessMove } from "../models/chessMoves";
import { squareService } from "./squareService";
import { Square, SquareObject } from "../hooks/square";

const handleRepeatedMoveUntilBreak = (
    square: SquareObject,
    callback: (square: SquareObject) => SquareObject
) => {
    let tempSquare = square.getSquare();
    while (true) {
        tempSquare = callback(tempSquare);

        if (tempSquare?.isOutsideBoard() || tempSquare === null) {
            break;
        }

        if (tempSquare.isOnPiece()) {
            if (tempSquare.isOnEnemyPiece()) moves.push(tempSquare.getSquare());
            break;
        }

        moves.push(tempSquare.getSquare());
    }
};

const prepareN1Moves = (
    move: ChessMove,
    metaData: MetaData,
    config: Config
): SquareObject[] => {
    let moves = [] as SquareObject[];

    if (move.x !== "n1" || move.y !== "n1") {
        console.log("Both need to be n1");
        return moves;
    }

    const startSquare = Square(metaData.square);

    handleRepeatedMoveUntilBreak(startSquare, (square) => {
        square.goUp();
        return square.goRight();
    });

    handleRepeatedMoveUntilBreak(startSquare, (square) => {
        square.goUp();
        return square.goLeft();
    });

    handleRepeatedMoveUntilBreak(startSquare, (square) => {
        square.goDown();
        return square.goRight();
    });

    handleRepeatedMoveUntilBreak(startSquare, (square) => {
        square.goDown();
        return square.goLeft();
    });

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

    if (handleVertical) {
        handleRepeatedMoveUntilBreak(square, (square) => square.goUp());
        handleRepeatedMoveUntilBreak(square, (square) => square.goDown());
    } else {
        handleRepeatedMoveUntilBreak(square, (square) => square.goRight());
        handleRepeatedMoveUntilBreak(square, (square) => square.goLeft());
    }

    return moves;
};

const preparePawnMove = (
    move: ChessMove,
    metaData: MetaData,
    config: Config
): SquareObject | null => {
    let square = Square(metaData.square);
    const isWhitePlayerAndWhitePiece = config.playerIsWhite && metaData.isWhite;

    const isFirstMove = (square: SquareObject) => {
        if (isWhitePlayerAndWhitePiece) {
            return square.getSquare().isOnRow(2);
        } else {
            return square.getSquare().isOnRow(7);
        }
    };

    if (move?.if?.includes("isFirstMove") && !isFirstMove(square)) {
        return null;
    }

    const handleAxis = (
        axis: "x" | "y",
        move: ChessMove,
        metaData: MetaData,
        callbacks: {
            blackAndPositive: (square: SquareObject) => void;
            blackAndNegative: (square: SquareObject) => void;
            whiteAndPositive: (square: SquareObject) => void;
            whiteAndNegative: (square: SquareObject) => void;
        }
    ) => {
        const value = move[axis];

        if (value !== 0 && Number.isInteger(value)) {
            let x = value as number;
            const isPositive = x > 0;

            if (isWhitePlayerAndWhitePiece) {
                for (let i = 0; i < Math.abs(x); i++) {
                    if (isPositive) {
                        callbacks.whiteAndPositive(square);
                    } else {
                        callbacks.whiteAndNegative(square);
                    }

                    if (square.isOnPiece()) {
                        break;
                    }
                }
            } else {
                for (let i = 0; i < Math.abs(x); i++) {
                    if (isPositive) {
                        callbacks.blackAndPositive(square);
                    } else {
                        callbacks.blackAndNegative(square);
                    }

                    if (square.isOnPiece()) {
                        break;
                    }
                }
            }
        }
    };

    handleAxis("y", move, metaData, {
        blackAndPositive: (square) => square.goDown(),
        blackAndNegative: (square) => square.goUp(),
        whiteAndPositive: (square) => square.goUp(),
        whiteAndNegative: (square) => square.goDown(),
    });

    handleAxis("x", move, metaData, {
        blackAndPositive: (square) => square.goLeft(),
        blackAndNegative: (square) => square.goRight(),
        whiteAndPositive: (square) => square.goRight(),
        whiteAndNegative: (square) => square.goLeft(),
    });

    if (move.if?.includes("canAttack") && !square.isOnEnemyPiece()) {
        return null;
    }

    if (!move.if?.includes("canAttack") && square.isOnPiece()) {
        return null;
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
