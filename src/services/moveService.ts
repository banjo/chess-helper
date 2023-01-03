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

const handleAxis = (
    axis: "y" | "x",
    square: SquareObject,
    moveOnAxis: number
) => {
    const isPositive = moveOnAxis > 0;
    const isNegative = moveOnAxis < 0;

    if (isPositive) {
        for (let i = 0; i < moveOnAxis; i++) {
            if (axis === "y") square.moveUp();
            if (axis === "x") square.moveRight();
        }
    }

    if (isNegative) {
        for (let i = 0; i > moveOnAxis; i--) {
            if (axis === "y") square.moveDown();
            if (axis === "x") square.moveLeft();
        }
    }
};

const prepareKingMove = (
    move: ChessMove,
    metaData: MetaData,
    config: Config
): SquareObject | null => {
    const x = move.x as number;
    const y = move.y as number;

    if (Number.isNaN(x) || Number.isNaN(y)) {
        console.log("Both need to be numbers");
        return null;
    }
    const square = Square(metaData.square);

    // TODO: handle castling
    if (move.condition?.includes("castling")) {
        return null;
    }

    handleAxis("x", square, x);
    handleAxis("y", square, y);

    return square;
};

const prepareKnightMove = (
    move: ChessMove,
    metaData: MetaData,
    config: Config
): SquareObject | null => {
    const x = move.x as number;
    const y = move.y as number;

    if (Number.isNaN(x) || Number.isNaN(y)) {
        console.log("Both need to be numbers");
        return null;
    }

    const square = Square(metaData.square);

    handleAxis("x", square, x);
    handleAxis("y", square, y);

    return square;
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
        square.moveUp();
        return square.moveRight();
    });

    handleRepeatedMoveUntilBreak(startSquare, (square) => {
        square.moveUp();
        return square.moveLeft();
    });

    handleRepeatedMoveUntilBreak(startSquare, (square) => {
        square.moveDown();
        return square.moveRight();
    });

    handleRepeatedMoveUntilBreak(startSquare, (square) => {
        square.moveDown();
        return square.moveLeft();
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
        handleRepeatedMoveUntilBreak(square, (square) => square.moveUp());
        handleRepeatedMoveUntilBreak(square, (square) => square.moveDown());
    } else {
        handleRepeatedMoveUntilBreak(square, (square) => square.moveRight());
        handleRepeatedMoveUntilBreak(square, (square) => square.moveLeft());
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

    if (move?.condition?.includes("isFirstMove") && !isFirstMove(square)) {
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
        blackAndPositive: (square) => square.moveDown(),
        blackAndNegative: (square) => square.moveUp(),
        whiteAndPositive: (square) => square.moveUp(),
        whiteAndNegative: (square) => square.moveDown(),
    });

    handleAxis("x", move, metaData, {
        blackAndPositive: (square) => square.moveLeft(),
        blackAndNegative: (square) => square.moveRight(),
        whiteAndPositive: (square) => square.moveRight(),
        whiteAndNegative: (square) => square.moveLeft(),
    });

    if (move.condition?.includes("canAttack") && !square.isOnEnemyPiece()) {
        return null;
    }

    if (!move.condition?.includes("canAttack") && square.isOnPiece()) {
        return null;
    }

    return square;
};

const moves: SquareObject[] = [];

const addMoves = (square: SquareObject | SquareObject[] | null | undefined) => {
    if (!square) return;

    const validate = (square: SquareObject) => {
        if (squareService.isOutsideOfBoard(square.getCurrent())) return;
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
    prepareKnightMove,
    prepareKingMove,
    addMoves,
    getMoves,
    clearMoves,
    prepareNMoves,
    prepareN1Moves,
};
