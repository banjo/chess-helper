import { Config, MetaData } from "./../types";
import { ChessMove } from "../models/chessMoves";

const preparePawnMove = (
    move: ChessMove,
    metaData: MetaData,
    config: Config
): number => {
    let square = Number(metaData.square);
    const isWhitePlayerAndWhitePiece = config.playerIsWhite && metaData.isWhite;

    if (move.x !== 0 && Number.isInteger(move.x)) {
        let x = move.x as number;
        if (metaData.type === "pawn" && !isWhitePlayerAndWhitePiece) {
            square = square - x * 10;
        } else {
            square = square + x * 10;
        }
    }

    if (move.y !== 0 && Number.isInteger(move.y)) {
        let y = move.y as number;

        if (metaData.type === "pawn" && !isWhitePlayerAndWhitePiece) {
            square = square - y;
        } else {
            square = square + y;
        }
    }

    return square;
};

const move = () => {};

export const moveService = { preparePawnMove, move };
