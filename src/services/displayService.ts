import { squareService } from "./squareService";
import { configService } from "./configService";
import { SquareObject } from "./../hooks/square";
import { displayMoveService } from "./displayMoveService";
import { domService } from "./domService";
import { pieceService } from "./pieceService";

const BACKGROUND_COLORS = {
    green: "lightgreen",
    gray: "lightgray",
    red: "red",
    orange: "orange",
};

const showPiecesInDanger = ({
    board,
    currentUserPieces,
    possibleEnemyMoves,
}) => {
    currentUserPieces.forEach((piece) => {
        const squareMetaData = squareService.getMetaDataForSquare(piece);

        const isPieceInDanger = possibleEnemyMoves.some(
            (s) => s.getCurrent() === squareMetaData.square
        );

        const element = domService.createElement({
            type: "div",
            classes: [
                "capture-hint",
                `square-${squareMetaData.square}`,
                "doRemove",
            ],
        });

        if (isPieceInDanger) {
            element.style.borderWidth = "8px";
            element.style.borderColor = BACKGROUND_COLORS.red;
            element.style.opacity = "0.5";
            board?.appendChild(element);
        }
    });
};

const showPossibleMoves = ({ board, activeMoves, possibleEnemyMoves }) => {
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

        const pieceCoveredByAmount = possibleEnemyMoves.filter(
            (s) => s.getCurrent() === square.getCurrent()
        ).length;

        let color = BACKGROUND_COLORS.gray;
        if (isUserPiece) {
            if (isPossibleEnemyMove && square.isOnEnemyPiece()) {
                color = BACKGROUND_COLORS.orange;
            } else if (isPossibleEnemyMove) {
                color = BACKGROUND_COLORS.orange;
            } else if (square.isOnEnemyPiece()) {
                color = BACKGROUND_COLORS.green;
            }

            if (pieceCoveredByAmount > 1) {
                element.textContent = pieceCoveredByAmount.toString();
                element.style.display = "grid";
                element.style.placeItems = "center";
            }
        }

        element.style.backgroundColor = color;
        element.style.opacity = "0.5";
        board?.appendChild(element);
    });
};

const displayMoves = () => {
    const board = domService.getBoard();
    const possibleEnemyMoves = pieceService.getPossibleEnemyMoves();
    const moves = displayMoveService.getMoves();
    const activeMoves = moves.filter((s) => s.isActivePiece());
    const currentUserPieces = pieceService.getCurrentUserPieces();

    showPiecesInDanger({ board, currentUserPieces, possibleEnemyMoves });
    showPossibleMoves({ board, activeMoves, possibleEnemyMoves });
};

export const displayService = { displayMoves };
