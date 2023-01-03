import { SquareObject } from "./../hooks/square";
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

        displayMoveService.addMoves(possibleMoves);

        // enemy possible moves
        const enemies = Array.from(document.querySelectorAll(".piece"))
            .filter((element) => {
                const metaData = squareService.getMetaDataForSquare(element);
                return metaData?.isWhite !== config.playerIsWhite;
            })
            .map((element) => squareService.getMetaDataForSquare(element));

        const possibleEnemyMoves = enemies.reduce<SquareObject[]>(
            (accumulator, enemy) => {
                const moves = chessMoves[enemy.type];
                const possibleMoves = squareService.getPossibleMoveSquares(
                    moves,
                    enemy,
                    config
                );

                return [...accumulator, ...possibleMoves];
            },
            []
        );

        displayMoveService.getMoves().forEach((square) => {
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

            const backgroundColors = {
                onEnemyPiece: "red",
                possibleMove: "darkgray",
                possibleEnemyMove: "orange",
            };

            const isPossibleEnemyMove = possibleEnemyMoves.some(
                (s) => s.getCurrent() === square.getCurrent()
            );

            let color = backgroundColors.possibleMove;

            if (square.isOnEnemyPiece()) {
                color = backgroundColors.onEnemyPiece;
            } else if (isPossibleEnemyMove) {
                color = backgroundColors.possibleEnemyMove;
            }

            element.style.backgroundColor = color;

            element.style.opacity = "0.5";
            board?.appendChild(element);
        });
    });
};

export const eventService = { addLeftClickEvent, addRightClickEvent };
