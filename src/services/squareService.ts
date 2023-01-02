import { chessTypes } from "./../models/chessTypes";
import { Config, MetaData } from "./../types";
import { ChessMove, chessMoves } from "./../models/chessMoves";
import { moveService } from "./moveService";
import { SquareObject } from "../hooks/square";
let fullLength = [1, 2, 3, 4, 5, 6, 7, 8];

const clearSquare = (board: Element) => {
    const toRemove = board.querySelectorAll(".doRemove");

    for (const element of toRemove as any) {
        element?.parentNode?.removeChild(element);
    }
};

const isLocatedOnAnotherPiece = (square: number, start: number) => {
    if (square === start) return false;

    const current = document.querySelector(`.square-${square}`);

    const isOnPiece = (current: Element) => {
        return current?.classList[0] === "piece";
    };

    return isOnPiece(current);
};

const isLocatedOnEndOfBoard = (square: number) => {
    const first = Number(String(square).charAt(0));
    const last = Number(String(square).charAt(1));

    if (first === 8 || first === 1) return true;
    if (last === 8 || last === 1) return true;

    return false;
};

const isOutsideOfBoard = (square: number) => {
    const first = Number(String(square).charAt(0));
    const last = Number(String(square).charAt(1));

    if (!first || !last) return true;

    if (first > 8 || first < 1) return true;
    if (last > 8 || last < 1) return true;

    return false;
};

const getPossibleMoveSquares = (
    moves: ChessMove[],
    metaData: MetaData,
    config: Config
) => {
    for (const move of moves) {
        let moves: SquareObject[];
        switch (metaData.type) {
            case "pawn":
                const pawnMove = moveService.preparePawnMove(
                    move,
                    metaData,
                    config
                );
                moves = [pawnMove];
                break;
            case "rook":
                moves = moveService.prepareNMoves(move, metaData, config);
                break;
            // case "bishop":
            //     moves = moveService.prepareN1Moves(move, metaData, config);
            //     break;
            // case "queen":
            //     const nMoves = moveService.prepareNMoves(move, metaData, config);
            //     const n1Moves = moveService.prepareN1Moves(move, metaData, config);
            //     moves = [...nMoves, ...n1Moves];

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
    isOutsideOfBoard,
    isLocatedOnAnotherPiece,
    isLocatedOnEndOfBoard,
    getPossibleMoveSquares,
    getMetaDataForSquare,
};
