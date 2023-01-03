import { SquareObject } from "../hooks/square";
import { squareService } from "./squareService";

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

export const displayMoveService = { addMoves, getMoves, clearMoves };
