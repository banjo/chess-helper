import { configService } from "./configService";
import { Config, MetaData } from "./../types";
import { ChessMove } from "../models/chessMoves";
import { squareService } from "./squareService";
import { Square, SquareObject } from "../hooks/square";

const handleRepeatedMoveUntilBreak = (
    square: SquareObject,
    moves: SquareObject[],
    callback: (square: SquareObject) => SquareObject
) => {
    let tempSquare = square.getSquare();
    while (true) {
        tempSquare = callback(tempSquare);

        if (tempSquare?.isOutsideBoard() || tempSquare === null) {
            break;
        }

        if (tempSquare.isOnPiece()) {
            if (tempSquare.isOnEnemyPiece()) {
                moves.push(tempSquare.getSquare());
            } else {
                tempSquare.setActivePiece(false);
                moves.push(tempSquare.getSquare());
            }
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
    metaData: MetaData
): SquareObject | null => {
    const x = move.x as number;
    const y = move.y as number;

    if (Number.isNaN(x) || Number.isNaN(y)) {
        console.log("Both need to be numbers");
        return null;
    }
    const square = Square(metaData.square, metaData);

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
    metaData: MetaData
): SquareObject | null => {
    const x = move.x as number;
    const y = move.y as number;

    if (Number.isNaN(x) || Number.isNaN(y)) {
        console.log("Both need to be numbers");
        return null;
    }

    const square = Square(metaData.square, metaData);

    handleAxis("x", square, x);
    handleAxis("y", square, y);

    return square;
};

const prepareN1Moves = (
    move: ChessMove,
    metaData: MetaData
): SquareObject[] => {
    let moves = [] as SquareObject[];

    if (move.x !== "n1" || move.y !== "n1") {
        console.log("Both need to be n1");
        return moves;
    }

    const startSquare = Square(metaData.square, metaData);

    handleRepeatedMoveUntilBreak(startSquare, moves, (square) => {
        square.moveUp();
        return square.moveRight();
    });

    handleRepeatedMoveUntilBreak(startSquare, moves, (square) => {
        square.moveUp();
        return square.moveLeft();
    });

    handleRepeatedMoveUntilBreak(startSquare, moves, (square) => {
        square.moveDown();
        return square.moveRight();
    });

    handleRepeatedMoveUntilBreak(startSquare, moves, (square) => {
        square.moveDown();
        return square.moveLeft();
    });

    return moves;
};

const prepareNMoves = (move: ChessMove, metaData: MetaData): SquareObject[] => {
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
    const square = Square(metaData.square, metaData);

    if (handleVertical) {
        handleRepeatedMoveUntilBreak(square, moves, (square) =>
            square.moveUp()
        );
        handleRepeatedMoveUntilBreak(square, moves, (square) =>
            square.moveDown()
        );
    } else {
        handleRepeatedMoveUntilBreak(square, moves, (square) =>
            square.moveRight()
        );
        handleRepeatedMoveUntilBreak(square, moves, (square) =>
            square.moveLeft()
        );
    }

    return moves;
};

const preparePawnMove = (
    move: ChessMove,
    metaData: MetaData
): SquareObject | null => {
    let square = Square(metaData.square, metaData);
    const isWhitePiece = metaData.isWhite;

    const checkIfFirstMove = (square: SquareObject) => {
        if (isWhitePiece) {
            return square.getSquare().isOnRow(2);
        } else {
            return square.getSquare().isOnRow(7);
        }
    };

    const isFirstMove = checkIfFirstMove(square);

    const handleAxis = (
        axis: "x" | "y",
        move: ChessMove,
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

            if (isWhitePiece) {
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

    handleAxis("y", move, {
        blackAndPositive: (square) => square.moveDown(),
        blackAndNegative: (square) => square.moveUp(),
        whiteAndPositive: (square) => square.moveUp(),
        whiteAndNegative: (square) => square.moveDown(),
    });

    handleAxis("x", move, {
        blackAndPositive: (square) => square.moveLeft(),
        blackAndNegative: (square) => square.moveRight(),
        whiteAndPositive: (square) => square.moveRight(),
        whiteAndNegative: (square) => square.moveLeft(),
    });

    if (move?.condition?.includes("isFirstMove") && !isFirstMove) {
        return null;
    }

    if (
        move?.condition?.includes("isFirstMove") &&
        isFirstMove &&
        square.isOnPiece()
    ) {
        square.setCanAttack(false);
        square.setActivePiece(false);
        return square;
    }

    if (move?.condition?.includes("isFirstMove") && isFirstMove) {
        square.setCanAttack(false);
        return square;
    }

    if (move?.condition?.includes("canAttack") && !square.isOnEnemyPiece()) {
        square.setActivePiece(false);
        return square;
    }

    if (move?.condition?.includes("canAttack") && square.isOnEnemyPiece()) {
        square.setCanAttack(true);
        return square;
    }

    if (!move?.condition?.includes("canAttack") && square.isOnPiece()) {
        square.setActivePiece(false);
        square.setCanAttack(false);
        return square;
    }

    if (move?.condition?.includes("base")) {
        square.setCanAttack(false);
        return square;
    }

    return square;
};

export const moveService = {
    preparePawnMove,
    prepareKnightMove,
    prepareKingMove,
    prepareNMoves,
    prepareN1Moves,
};
