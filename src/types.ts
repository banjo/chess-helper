import { ChessType } from "./models/chessTypes";

export type MetaData = {
    isWhite: boolean;
    type: ChessType;
    square: number;
    element: Element;
};

export type Config = {
    playerIsWhite: boolean;
};
