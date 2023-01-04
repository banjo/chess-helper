import { MetaData } from "./../types";
import { ChessType } from "./../models/chessTypes";
import { squareService } from "./../services/squareService";
const ALTERATION_FIRST = 10;
const ALTERATION_LAST = 1;

export type SquareObject = {
    getStartSquare: () => number;
    getFirst: () => number;
    getLast: () => number;
    getCurrent: () => number;
    getMetaData: () => MetaData;
    moveRight: () => SquareObject | null;
    moveLeft: () => SquareObject | null;
    moveUp: () => SquareObject | null;
    moveDown: () => SquareObject | null;
    setActivePiece: (boolean: boolean) => void;
    setCanAttack: (attacking: boolean) => void;
    canAttack: () => boolean;
    isActivePiece: () => boolean;
    isOnPiece: () => boolean;
    isOnEnemyPiece: () => boolean;
    isOnEndOfBoard: () => boolean;
    isOutsideBoard: () => boolean;
    isOnRow: (row: number) => boolean;
    getSquare: () => SquareObject;
};

export type SquareHook = (
    square: number | string,
    metaData: MetaData,
    startSquare?: null | number
) => SquareObject;

export const Square: SquareHook = (
    square: number | string,
    metaData: MetaData,
    startSquare: null | number = null
) => {
    startSquare = startSquare ?? Number(square);
    let current = Number(square);
    let isOnPiece = false;
    let isOnEnemyPiece = false;
    let isOnEndOfBoard = false;
    let isOutsideBoard = false;
    let isActivePiece = true; // active meaning that the move is valid. For example, a pawn can attack diagonally, but only if there is a piece there. Meaning that that square is registered as a move, but not active.
    let canAttack = true; // can be false if the piece cannot overtake another piece even though the move can be done.

    const validate = () => {
        const info = squareService.getCurrentLocationPieceInfo(
            current,
            startSquare
        );

        if (info) {
            isOnPiece = info.isOnPiece;
            isOnEnemyPiece = info.isOnEnemyPiece;
        } else {
            isOnPiece = false;
            isOnEnemyPiece = false;
        }

        if (squareService.isLocatedOnEndOfBoard(current)) {
            isOnEndOfBoard = true;
        }

        if (squareService.isOutsideOfBoard(current)) {
            isOutsideBoard = true;
        }
    };

    validate();

    const getFirst = () => Number(String(current).charAt(0));
    const getLast = () => Number(String(current).charAt(1));

    const moveRight = () => {
        current += ALTERATION_FIRST;
        validate();
        return Square(current, metaData, startSquare);
    };

    const moveLeft = () => {
        current -= ALTERATION_FIRST;
        validate();
        return Square(current, metaData, startSquare);
    };

    const moveUp = () => {
        current += ALTERATION_LAST;
        validate();
        return Square(current, metaData, startSquare);
    };

    const moveDown = () => {
        current -= ALTERATION_LAST;
        validate();
        return Square(current, metaData, startSquare);
    };

    const setActivePiece = (active: boolean) => {
        isActivePiece = active;
    };

    const setCanAttack = (attacking: boolean) => {
        canAttack = attacking;
    };

    return {
        getStartSquare: () => startSquare,
        getFirst,
        getLast,
        getCurrent: () => current,
        getMetaData: () => metaData,
        moveRight,
        moveLeft,
        moveUp,
        moveDown,
        setActivePiece,
        setCanAttack,
        isActivePiece: () => isActivePiece,
        canAttack: () => canAttack,
        isOnPiece: () => isOnPiece,
        isOnEnemyPiece: () => isOnEnemyPiece,
        isOnEndOfBoard: () => isOnEndOfBoard,
        isOutsideBoard: () => isOutsideBoard,
        isOnRow: (row: number) => getLast() === row,
        getSquare: () => Square(current, metaData, startSquare),
    };
};
