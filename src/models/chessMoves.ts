import { ChessType } from "./chessTypes";

export type Action = "isFirstMove" | "canAttack" | "always";

export type ChessMove = {
    x: number | "n" | "n1";
    y: number | "n" | "n1";
    condition?: Action[];
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
            condition: ["isFirstMove"],
        },
        {
            y: 1,
            x: 1,
            condition: ["canAttack"],
        },
        {
            y: 1,
            x: -1,
            condition: ["canAttack"],
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
    knight: [
        {
            y: 2,
            x: 1,
            condition: ["always"],
        },
        {
            y: 2,
            x: -1,
            condition: ["always"],
        },
        {
            y: -2,
            x: 1,
            condition: ["always"],
        },
        {
            y: -2,
            x: -1,
            condition: ["always"],
        },
        {
            y: 1,
            x: 2,
            condition: ["always"],
        },
        {
            y: 1,
            x: -2,
            condition: ["always"],
        },
        {
            y: -1,
            x: 2,
            condition: ["always"],
        },
        {
            y: -1,
            x: -2,
            condition: ["always"],
        },
    ],
    king: [],
};
