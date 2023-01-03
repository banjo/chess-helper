import { configService } from "./configService";
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

        // TODO: include pawn side movement in possible enemy moves and exlude pawn front movement

        const isUserPiece =
            (configService.playerIsWhite() && square.getMetaData().isWhite) ||
            (!configService.playerIsWhite() && !square.getMetaData().isWhite);

        let color = backgroundColors.possibleMove;

        if (isUserPiece) {
            if (isPossibleEnemyMove && square.isOnEnemyPiece()) {
                color = backgroundColors.possibleEnemyMove;
                // TODO: add indication that is possible to take but also to be taken afterwards
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
