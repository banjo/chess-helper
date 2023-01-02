import { chessTypes } from "./../models/chessTypes";
import { Config, MetaData } from "./../types";
import { ChessMove, chessMoves } from "./../models/chessMoves";
import { moveService } from "./moveService";
let fullLength = [1, 2, 3, 4, 5, 6, 7, 8];

const clearSquare = (board: Element) => {
    const toRemove = board.querySelectorAll(".doRemove");

    for (const element of toRemove as any) {
        element?.parentNode?.removeChild(element);
    }
};

const isLocatedOnAnotherPiece = (square: number) => {
    const current = document.querySelector(`.square-${square}`);

    const isOnPiece = (current: Element) => {
        return current?.classList[0] === "piece";
    };

    return isOnPiece(current);
};

const validateSquare = (square: string | number) => {
    let squareAsNumber = Number(square);
    let squareAsString = squareAsNumber.toString();
    if (Number(squareAsString[0]) > 8 || Number(squareAsString[0]) < 1)
        return false;
    if (Number(squareAsString[1]) > 8 || Number(squareAsString[1]) < 1)
        return false;

    return true;
};

const getPossibleMoveSquares = (
    moves: ChessMove[],
    metaData: MetaData,
    config: Config
) => {
    for (const move of moves) {
        let moves;
        switch (metaData.type) {
            case "pawn":
                moves = moveService.preparePawnMove(move, metaData, config);
                break;
            case "rook":
                moves = moveService.prepareNMoves(move, metaData, config);
                break;
            case "bishop":
                moves = moveService.prepareN1Moves(move, metaData, config);
                break;
            case "queen":
                const nMoves = moveService.prepareNMoves(move, metaData, config);
                const n1Moves = moveService.prepareN1Moves(move, metaData, config);
                moves = [...nMoves, ...n1Moves];

            default:
                console.log("Not implemented yet");
        }

        moveService.addMoves(moves);
    }

    return moveService.getMoves();
};

const getMetaDataForSquare = (target): MetaData | null => {
    if (target instanceof SVGElement) return null;

    if (!target?.className?.includes("piece")) return null;

    const data = target.className.split(" ");

    const pieceInfo = data[1];
    const squareInfo = data[2];

    const square = squareInfo.split("-")[1];
    const pieceAbbreviation = pieceInfo[1];

    return {
        isWhite: pieceInfo.startsWith("b") ? false : true,
        type: chessTypes[pieceAbbreviation],
        square,
    };
};

export const squareService = {
    clearSquare,
    validateSquare,
    isLocatedOnAnotherPiece,
    getPossibleMoveSquares,
    getMetaDataForSquare,
};
