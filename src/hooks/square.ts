import { squareService } from "./../services/squareService";
const ALTERATION_FIRST = 10;
const ALTERATION_LAST = 1;

export type SquareObject = {
    getStartSquare: () => number;
    getFirst: () => number;
    getLast: () => number;
    getCurrent: () => number;
    goRight: () => SquareObject | null;
    goLeft: () => SquareObject | null;
    goUp: () => SquareObject | null;
    goDown: () => SquareObject | null;
    isOnPiece: () => boolean;
    isOnEnemyPiece: () => boolean;
    isOnEndOfBoard: () => boolean;
    isOutsideBoard: () => boolean;
    getSquare: () => SquareObject;
};

export type SquareHook = (
    square: number | string,
    startSquare?: null | number
) => SquareObject;

export const Square: SquareHook = (
    square: number | string,
    startSquare: null | number = null
) => {
    startSquare = startSquare ?? Number(square);
    let current = Number(square);
    let isOnPiece = false;
    let isOnEnemyPiece = false;
    let isOnEndOfBoard = false;
    let isOutsideBoard = false;

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

    const goRight = () => {
        current += ALTERATION_FIRST;
        validate();
        return Square(current, startSquare);
    };

    const goLeft = () => {
        current -= ALTERATION_FIRST;
        validate();
        return Square(current, startSquare);
    };

    const goUp = () => {
        current += ALTERATION_LAST;
        validate();
        return Square(current, startSquare);
    };

    const goDown = () => {
        current -= ALTERATION_LAST;
        validate();
        return Square(current, startSquare);
    };

    return {
        getStartSquare: () => startSquare,
        getFirst,
        getLast,
        getCurrent: () => current,
        goRight,
        goLeft,
        goUp,
        goDown,
        isOnPiece: () => isOnPiece,
        isOnEnemyPiece: () => isOnEnemyPiece,
        isOnEndOfBoard: () => isOnEndOfBoard,
        isOutsideBoard: () => isOutsideBoard,
        getSquare: () => Square(current, startSquare),
    };
};
