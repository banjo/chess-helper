import { squareService } from "./../services/squareService";
const MAX_SQUARE = 8;
const MIN_SQUARE = 1;
const ALTERATION_FIRST = 10;
const ALTERATION_LAST = 1;

export type SquareObject = {
    getStartSquare: () => number;
    getFirst: () => number;
    getLast: () => number;
    getCurrent: () => number;
    increaseFirst: () => SquareObject | null;
    decreaseFirst: () => SquareObject | null;
    increaseLast: () => SquareObject | null;
    decreaseLast: () => SquareObject | null;
    isOnPiece: () => boolean;
    isOnEndOfBoard: () => boolean;
    isOutsideBoard: () => boolean;
    getSquare: () => SquareObject;
};

export type SquareHook = (square: number | string) => SquareObject;

export const Square: SquareHook = (square: number | string) => {
    const startSquare = Number(square);
    let current = Number(square);
    let isOnPiece = false;
    let isOnEndOfBoard = false;
    let isOutsideBoard = false;

    const validate = () => {
        if (squareService.isLocatedOnAnotherPiece(current, startSquare)) {
            isOnPiece = true;
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

    const increaseFirst = () => {
        if (getFirst() === MAX_SQUARE) {
            validate();
            return null;
        }
        current += ALTERATION_FIRST;
        validate();
        return Square(current);
    };

    const decreaseFirst = () => {
        if (getFirst() === MIN_SQUARE) {
            validate();
            return null;
        }
        current -= ALTERATION_FIRST;
        validate();
        return Square(current);
    };

    const increaseLast = () => {
        if (getLast() === MAX_SQUARE) {
            validate();
            return null;
        }
        current += ALTERATION_LAST;
        validate();
        return Square(current);
    };

    const decreaseLast = () => {
        if (getLast() === MIN_SQUARE) {
            validate();
            return null;
        }

        current -= ALTERATION_LAST;
        validate();
        return Square(current);
    };

    return {
        getStartSquare: () => startSquare,
        getFirst,
        getLast,
        getCurrent: () => current,
        increaseFirst,
        decreaseFirst,
        increaseLast,
        decreaseLast,
        isOnPiece: () => isOnPiece,
        isOnEndOfBoard: () => isOnEndOfBoard,
        isOutsideBoard: () => isOutsideBoard,
        getSquare: () => Square(current),
    };
};
