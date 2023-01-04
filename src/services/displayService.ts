import { squareService } from "./squareService";
import { configService } from "./configService";
import { SquareObject } from "./../hooks/square";
import { displayMoveService } from "./displayMoveService";
import { domService } from "./domService";
import { pieceService } from "./pieceService";

const BACKGROUND_COLORS = {
    onEnemyPiece: "lightgreen",
    possibleMove: "lightgreen",
    possibleEnemyMove: "red",
    userPieceInDanger: "orange",
};

const displayMoves = () => {
    const board = domService.getBoard();
    const possibleEnemyMoves = pieceService.getPossibleEnemyMoves();
    const moves = displayMoveService.getMoves();
    const activeMoves = moves.filter((s) => s.isActivePiece());
    const currentUserPieces = pieceService.getCurrentUserPieces();

    // show pieces in danger
    currentUserPieces.forEach((piece) => {
        const squareMetaData = squareService.getMetaDataForSquare(piece);

        const isPieceInDanger = possibleEnemyMoves.some(
            (s) => s.getCurrent() === squareMetaData.square
        );

        const element = domService.createElement({
            type: "div",
            classes: ["hint", `square-${squareMetaData.square}`, "doRemove"],
        });

        if (isPieceInDanger) {
            element.style.backgroundColor = BACKGROUND_COLORS.userPieceInDanger;
            board?.appendChild(element);
        }
    });

    // show possible moves
    activeMoves.forEach((square) => {
        if (square === null || square === undefined) return;
        if (square.getCurrent() === square.getStartSquareNumber()) return;
        if (square.isOnPiece() && !square.isOnEnemyPiece()) return;

        const classes = ["hint", `square-${square.getCurrent()}`, "doRemove"];

        if (square.isOnEnemyPiece()) classes.push("enemy");

        const element = domService.createElement({
            type: "div",
            classes,
        });

        const isPossibleEnemyMove = possibleEnemyMoves.some(
            (s) => s.getCurrent() === square.getCurrent()
        );

        const isUserPiece =
            (configService.playerIsWhite() && square.getMetaData().isWhite) ||
            (!configService.playerIsWhite() && !square.getMetaData().isWhite);

        let color = BACKGROUND_COLORS.possibleMove;

        if (isUserPiece) {
            if (isPossibleEnemyMove && square.isOnEnemyPiece()) {
                color = BACKGROUND_COLORS.possibleEnemyMove;
            } else if (isPossibleEnemyMove) {
                color = BACKGROUND_COLORS.possibleEnemyMove;
            } else if (square.isOnEnemyPiece()) {
                color = BACKGROUND_COLORS.onEnemyPiece;
            }
        }

        element.style.backgroundColor = color;

        element.style.opacity = "0.5";
        board?.appendChild(element);
    });
};

export const displayService = { displayMoves };
