import { squareService } from "./../services/squareService";
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
        current += ALTERATION_FIRST;
        validate();
        return Square(current, startSquare);
    };

    const decreaseFirst = () => {
        current -= ALTERATION_FIRST;
        validate();
        return Square(current, startSquare);
    };

    const increaseLast = () => {
        current += ALTERATION_LAST;
        validate();
        return Square(current, startSquare);
    };

    const decreaseLast = () => {
        current -= ALTERATION_LAST;
        validate();
        return Square(current, startSquare);
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
        getSquare: () => Square(current, startSquare),
    };
};
