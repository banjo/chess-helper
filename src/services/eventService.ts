import { moveService } from "./moveService";
import { Config } from "./../types";
import { domService } from "./domService";
import { chessMoves } from "./../models/chessMoves";
import { squareService } from "./squareService";

const addLeftClickEvent = () => {
    const board = domService.getBoard();
    board.addEventListener("click", (e) => {
        squareService.clearSquare(board);
        moveService.clearMoves();
    });
};

const addRightClickEvent = (config: Config) => {
    const board = domService.getBoard();

    board.addEventListener("contextmenu", (e) => {
        const target = e.target;
        const metaData = squareService.getMetaDataForSquare(target);

        if (metaData === null) return;

        console.log("BOARD: ", metaData.square);

        const moves = chessMoves[metaData.type];

        const possibleMoves = squareService.getPossibleMoveSquares(
            moves,
            metaData,
            config
        );

        possibleMoves.forEach((square) => {
            const classes = [
                "hint",
                `square-${square.getCurrent()}`,
                "doRemove",
            ];

            if (square.isOnEnemyPiece()) classes.push("enemy");

            const element = domService.createElement({
                type: "div",
                classes,
            });

            element.style.backgroundColor = square.isOnEnemyPiece()
                ? "red"
                : "darkgray";

            element.style.opacity = "0.5";
            board?.appendChild(element);
        });
    });
};

export const eventService = { addLeftClickEvent, addRightClickEvent };
