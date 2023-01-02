import { domService } from "./domService";
import { chessMoves } from "./../models/chessMoves";
import { squareService } from "./squareService";

const addLeftClickEvent = (board: Element) => {
    board.addEventListener("click", (e) => {
        squareService.clearSquare(board);
    });
};

const addRightClickEvent = (board: Element, config) => {
    board.addEventListener("contextmenu", (e) => {
        const target = e.target;
        const metaData = squareService.getMetaDataForSquare(target);

        if (metaData === null) return;

        const moves = chessMoves[metaData.type];

        const possibleMoves = squareService.getPossibleMoveSquares(
            moves,
            metaData,
            config
        );

        possibleMoves.forEach((m) => {
            const element = domService.createElement({
                type: "div",
                classes: ["hint", `square-${m}`, "doRemove"],
            });

            element.style.backgroundColor = "darkgray";
            element.style.opacity = "0.5";
            board?.appendChild(element);
        });
    });
};

export const eventService = { addLeftClickEvent, addRightClickEvent };