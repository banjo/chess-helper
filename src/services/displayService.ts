import { configService } from "./configService";
import { SquareObject } from "./../hooks/square";
import { displayMoveService } from "./displayMoveService";
import { domService } from "./domService";
import { enemyService } from "./enemyService";

const displayMoves = () => {
    const board = domService.getBoard();
    const possibleEnemyMoves = enemyService.getPossibleEnemyMoves();
    const moves = displayMoveService.getMoves();
    const activeMoves = moves.filter((s) => s.isActivePiece());

    activeMoves.forEach((square) => {
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
            onEnemyPiece: "lightgreen",
            possibleMove: "lightgreen",
            possibleEnemyMove: "red",
        };

        const isPossibleEnemyMove = possibleEnemyMoves.some(
            (s) => s.getCurrent() === square.getCurrent()
        );

        const isUserPiece =
            (configService.playerIsWhite() && square.getMetaData().isWhite) ||
            (!configService.playerIsWhite() && !square.getMetaData().isWhite);

        let color = backgroundColors.possibleMove;

        if (isUserPiece) {
            if (isPossibleEnemyMove && square.isOnEnemyPiece()) {
                color = backgroundColors.possibleEnemyMove;
            } else if (isPossibleEnemyMove) {
                color = backgroundColors.possibleEnemyMove;
            } else if (square.isOnEnemyPiece()) {
                color = backgroundColors.onEnemyPiece;
            }
        }

        element.style.backgroundColor = color;

        element.style.opacity = "0.5";
        board?.appendChild(element);
    });
};

export const displayService = { displayMoves };
