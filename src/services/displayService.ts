import { SquareObject } from "./../hooks/square";
import { displayMoveService } from "./displayMoveService";
import { domService } from "./domService";
import { enemyService } from "./enemyService";

const displayMoves = () => {
    const board = domService.getBoard();
    const possibleEnemyMoves = enemyService.getPossibleEnemyMoves();
    const moves = displayMoveService.getMoves();

    moves.forEach((square) => {
        if (square === null || square === undefined) return;
        if (square.getCurrent() === square.getStartSquare()) return;
        if (square.isOnPiece() && !square.isOnEnemyPiece()) return;

        const classes = ["hint", `square-${square.getCurrent()}`, "doRemove"];

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
};

export const displayService = { displayMoves };
