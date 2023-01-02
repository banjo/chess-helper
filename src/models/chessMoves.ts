import { ChessType } from "./chessTypes";

export type ChessMove = {
    x: number | "n" | "n1";
    y: number | "n" | "n1";
    if?: string[];
};

export const chessMoves: Record<ChessType, ChessMove[]> = {
    pawn: [
        {
            x: 0,
            y: 1,
        },
        {
            x: 0,
            y: 2,
            if: ["isFirstMove"],
        },
        {
            y: 1,
            x: 1,
            if: ["canAttack"],
        },
        {
            y: 1,
            x: -1,
            if: ["canAttack"],
        },
    ],
    rook: [
        {
            y: "n",
            x: 0,
        },
        {
            y: 0,
            x: "n",
        },
    ],
    bishop: [
        {
            y: "n1",
            x: "n1",
        },
    ],
    queen: [
        {
            y: "n1",
            x: "n1",
        },
        {
            y: "n",
            x: 0,
        },
        {
            y: 0,
            x: "n",
        },
    ],
    knight: [],
    king: [],
};
