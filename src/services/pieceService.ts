import { chessMoves } from "../models/chessMoves";
import { SquareObject } from "../hooks/square";
import { configService } from "./configService";
import { squareService } from "./squareService";

const getCurrentEnemyPieces = () => {
    const enemyPieces = Array.from(document.querySelectorAll(".piece")).filter(
        (element) => {
            const metaData = squareService.getMetaDataForSquare(element);
            return metaData?.isWhite !== configService.playerIsWhite();
        }
    );

    return enemyPieces;
};

const getCurrentUserPieces = () => {
    const userPieces = Array.from(document.querySelectorAll(".piece")).filter(
        (element) => {
            const metaData = squareService.getMetaDataForSquare(element);
            return metaData?.isWhite === configService.playerIsWhite();
        }
    );

    return userPieces;
};

const getPossibleEnemyMoves = () => {
    const enemies = getCurrentEnemyPieces().map((element) =>
        squareService.getMetaDataForSquare(element)
    );

    const possibleEnemyMoves = enemies.reduce<SquareObject[]>(
        (accumulator, enemy) => {
            const moves = chessMoves[enemy.type];
            const possibleMoves = squareService.getPossibleMoveSquares(
                moves,
                enemy
            );

            return [
                ...accumulator,
                ...possibleMoves.filter((s) => s.canAttack()),
            ];
        },
        []
    );

    return possibleEnemyMoves;
};

const getPossibleUserMoves = () => {
    const userPieces = getCurrentUserPieces().map((element) =>
        squareService.getMetaDataForSquare(element)
    );

    const possibleUserMoves = userPieces.reduce<SquareObject[]>(
        (accumulator, userPiece) => {
            const moves = chessMoves[userPiece.type];
            const possibleMoves = squareService.getPossibleMoveSquares(
                moves,
                userPiece
            );

            return [
                ...accumulator,
                ...possibleMoves.filter((s) => s.canAttack()),
            ];
        },
        []
    );

    return possibleUserMoves;
};

export const pieceService = {
    getPossibleEnemyMoves,
    getPossibleUserMoves,
    getCurrentEnemyPieces,
    getCurrentUserPieces,
};
