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
    allPossibleUserMoves,
}: {
    board: Element;
    currentUserPieces: Element[];
    possibleEnemyMoves: SquareObject[];
    allPossibleUserMoves: SquareObject[];
}) => {
    currentUserPieces.forEach((piece) => {
        const squareMetaData = squareService.getMetaDataForSquare(piece);

        const isPieceInDanger = possibleEnemyMoves.some(
            (s) => s.getCurrent() === squareMetaData.square
        );

        const possibleMovesExludedCurrentPiece = allPossibleUserMoves.filter(
            (s) => {
                return piece.isEqualNode(s.getMetaData().element) === false;
            }
        );

        const pieceHasBackup = possibleMovesExludedCurrentPiece.some((s) => {
            return s.getCurrent() === squareMetaData.square;
        });

        const element = domService.createElement({
            type: "div",
            classes: [
                "capture-hint",
                `square-${squareMetaData.square}`,
                "doRemove",
            ],
        });

        if (isPieceInDanger && pieceHasBackup) {
            element.style.borderColor = BACKGROUND_COLORS.orange;
        } else if (isPieceInDanger) {
            element.style.borderColor = BACKGROUND_COLORS.red;
        }

        element.style.borderWidth = "8px";
        element.style.opacity = "0.5";
        board?.appendChild(element);
    });
};

const showPossibleMoves = ({
    board,
    activeMoves,
    possibleEnemyMoves,
}: {
    board: Element;
    activeMoves: SquareObject[];
    possibleEnemyMoves: SquareObject[];
}) => {
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

const showPossibleFreeCaptures = ({
    board,
    allPossibleUserMoves,
    possibleEnemyMoves,
}: {
    board: Element;
    allPossibleUserMoves: SquareObject[];
    possibleEnemyMoves: SquareObject[];
}) => {
    allPossibleUserMoves.forEach((square) => {
        if (square === null || square === undefined) return;
        if (square.getCurrent() === square.getStartSquareNumber()) return;
        if (square.isOnPiece() && !square.isOnEnemyPiece()) return;
        if (!square.isOnEnemyPiece()) return;

        const isPossibleEnemyMove = possibleEnemyMoves.some(
            (s) => s.getCurrent() === square.getCurrent()
        );

        const isUserPiece =
            (configService.playerIsWhite() && square.getMetaData().isWhite) ||
            (!configService.playerIsWhite() && !square.getMetaData().isWhite);

        const classes = [
            "capture-hint",
            `square-${square.getCurrent()}`,
            "doRemove",
        ];

        const element = domService.createElement({
            type: "div",
            classes,
        });

        if (isUserPiece && !isPossibleEnemyMove) {
            element.style.borderWidth = "8px";
            element.style.borderColor = BACKGROUND_COLORS.green;
            element.style.opacity = "0.5";
            board?.appendChild(element);
        }
    });
};

const displayMoves = () => {
    const board = domService.getBoard();
    const possibleEnemyMoves = pieceService.getPossibleEnemyMoves();
    const moves = displayMoveService.getMoves(); // moves for that particlar piece
    const activeMoves = moves.filter((s) => s.isActivePiece());
    const currentUserPieces = pieceService.getCurrentUserPieces();
    const allPossibleUserMoves = pieceService.getPossibleUserMoves();

    showPiecesInDanger({
        board,
        currentUserPieces,
        possibleEnemyMoves,
        allPossibleUserMoves,
    });
    showPossibleMoves({ board, activeMoves, possibleEnemyMoves });
    showPossibleFreeCaptures({
        board,
        allPossibleUserMoves,
        possibleEnemyMoves,
    });
};

export const displayService = { displayMoves };
