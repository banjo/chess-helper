import { moveService } from "./moveService";
import { Config } from "./../types";
import { domService } from "./domService";
import { chessMoves } from "./../models/chessMoves";
import { squareService } from "./squareService";
import { displayMoveService } from "./displayMoveService";

const addLeftClickEvent = () => {
    const board = domService.getBoard();
    board.addEventListener("click", (e) => {
        squareService.clearSquare(board);
        displayMoveService.clearMoves();
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
            if (square === null || square === undefined) return;
            if (square.getCurrent() === square.getStartSquare()) return;
            if (square.isOnPiece() && !square.isOnEnemyPiece()) return;

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
