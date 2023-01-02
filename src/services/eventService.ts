import { Config } from "./../types";
import { domService } from "./domService";
import { chessMoves } from "./../models/chessMoves";
import { squareService } from "./squareService";

const addLeftClickEvent = (board: Element) => {
    board.addEventListener("click", (e) => {
        squareService.clearSquare(board);
    });
};

const addRightClickEvent = (board: Element, config: Config) => {
    board.addEventListener("contextmenu", (e) => {
        const target = e.target;
        const metaData = squareService.getMetaDataForSquare(target);

        console.log(metaData);

        if (metaData === null) return;

        const moves = chessMoves[metaData.type];

        console.log(moves);

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
