import { chessMoves } from "./../models/chessMoves";
import { SquareObject } from "./../hooks/square";
import { configService } from "./configService";
import { squareService } from "./squareService";

const getPossibleEnemyMoves = () => {
    const enemies = Array.from(document.querySelectorAll(".piece"))
        .filter((element) => {
            const metaData = squareService.getMetaDataForSquare(element);
            return metaData?.isWhite !== configService.playerIsWhite();
        })
        .map((element) => squareService.getMetaDataForSquare(element));

    const possibleEnemyMoves = enemies.reduce<SquareObject[]>(
        (accumulator, enemy) => {
            const moves = chessMoves[enemy.type];
            const possibleMoves = squareService.getPossibleMoveSquares(
                moves,
                enemy
            );

            return [...accumulator, ...possibleMoves];
        },
        []
    );

    return possibleEnemyMoves;
};

export const enemyService = { getPossibleEnemyMoves };
