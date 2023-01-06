import { SquareObject } from "./../hooks/square";
import { moveService } from "./moveService";
import { Config } from "./../types";
import { domService } from "./domService";
import { chessMoves } from "./../models/chessMoves";
import { squareService } from "./squareService";
import { displayMoveService } from "./displayMoveService";
import { displayService } from "./displayService";

const addLeftClickEvent = () => {
    const board = domService.getBoard();

    if (board === null) return false;

    board.addEventListener("click", (e) => {
        squareService.clearSquare(board);
        displayMoveService.clearMoves();
    });

    return true;
};

const addRightClickEvent = () => {
    const board = domService.getBoard();

    if (board === null) return false;

    board.addEventListener("contextmenu", (e) => {
        squareService.clearSquare(board);
        displayMoveService.clearMoves();

        const target = e.target;
        const metaData = squareService.getMetaDataForSquare(target);

        if (metaData === null) return;

        const moves = chessMoves[metaData.type];

        const possibleMoves = squareService.getPossibleMoveSquares(
            moves,
            metaData
        );

        displayMoveService.addMoves(possibleMoves);
        displayService.displayMoves();
    });

    return true;
};

export const eventService = { addLeftClickEvent, addRightClickEvent };
