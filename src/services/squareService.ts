import { displayMoveService } from "./displayMoveService";
import { configService } from "./configService";
import { chessTypes } from "./../models/chessTypes";
import { Config, MetaData } from "./../types";
import { ChessMove, chessMoves } from "./../models/chessMoves";
import { moveService } from "./moveService";
import { SquareObject } from "../hooks/square";

const clearSquare = (board: Element) => {
    const toRemove = board.querySelectorAll(".doRemove");

    for (const element of toRemove as any) {
        element?.parentNode?.removeChild(element);
    }
};

const getCurrentLocationPieceInfo = (square: number, start: number) => {
    if (square === start) return null;

    const startSquare = Array.from(
        document.querySelectorAll(`.square-${start}`)
    ).find((e) => e.classList[0] === "piece");

    const current = Array.from(
        document.querySelectorAll(`.square-${square}`)
    ).find((e) => e.classList[0] === "piece");

    const isBlackPiecePlaying = startSquare?.classList[1]?.startsWith("b");

    const isOnPiece = (current: Element) => {
        return current?.classList[0] === "piece";
    };

    const isStandingOnWhitePiece = (current: Element) => {
        return current?.classList[1].startsWith("w");
    };

    const isOnEnemy =
        (isBlackPiecePlaying && isStandingOnWhitePiece(current)) ||
        (!isBlackPiecePlaying && !isStandingOnWhitePiece(current));

    return {
        isOnPiece: isOnPiece(current),
        isOnEnemyPiece: isOnPiece(current) ? isOnEnemy : false,
    };
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

const getPossibleMoveSquares = (moves: ChessMove[], metaData: MetaData) => {
    let totalMoves: SquareObject[] = [];

    for (const move of moves) {
        let tempMoves: SquareObject[] = [];

        switch (metaData.type) {
            case "pawn":
                const pawnMove = moveService.preparePawnMove(move, metaData);

                if (pawnMove) tempMoves = [pawnMove];
                break;
            case "rook":
                tempMoves = moveService.prepareNMoves(move, metaData);
                break;
            case "bishop":
                tempMoves = moveService.prepareN1Moves(move, metaData);
                break;
            case "queen":
                const isNMove = move.x === "n" || move.y === "n";

                if (isNMove) {
                    tempMoves = moveService.prepareNMoves(move, metaData);
                } else {
                    tempMoves = moveService.prepareN1Moves(move, metaData);
                }
                break;

            case "knight":
                const knightMove = moveService.prepareKnightMove(
                    move,
                    metaData
                );

                if (knightMove) tempMoves = [knightMove];
                break;
            case "king":
                const kingMove = moveService.prepareKingMove(move, metaData);

                if (kingMove) tempMoves = [kingMove];
                break;
            default:
                console.log("Not implemented yet");
        }

        totalMoves = [...totalMoves, ...tempMoves];
    }

    return totalMoves;
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
        square: Number(square),
    };
};

export const squareService = {
    clearSquare,
    isOutsideOfBoard,
    getCurrentLocationPieceInfo,
    isLocatedOnEndOfBoard,
    getPossibleMoveSquares,
    getMetaDataForSquare,
};
