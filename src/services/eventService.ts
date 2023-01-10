import { configService } from "./configService";
import { domService } from "./domService";
import { chessMoves } from "./../models/chessMoves";
import { squareService } from "./squareService";
import { displayMoveService } from "./displayMoveService";
import { displayService } from "./displayService";

let firstRun = true;

const addLeftClickEvent = () => {
    const board = domService.getBoard();

    if (board === null) return false;

    board.addEventListener("click", () => {
        squareService.clearSquare(board);
        displayMoveService.clearMoves();
    });

    return true;
};

const addRightClickEvent = () => {
    if (firstRun) {
        configService.init();
        firstRun = false;
    }

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
