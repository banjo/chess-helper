import { chessTypes } from "./../models/chessTypes";
import { MetaData } from "./../types";
import { chessMoves } from "./../models/chessMoves";
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

const getPossibleMoveSquares = (moves, metaData, config) => {
    let result = [] as number[];

    for (const m of moves) {
        let square = Number(metaData.square);

        // n1
        if (m.x === "n1" && m.y === "n1") {
            let finalSquare = square;

            for (const number of fullLength) {
                let firstWay = finalSquare + number + number * 10;
                if (!validateSquare(firstWay)) break;

                if (isLocatedOnAnotherPiece(firstWay)) {
                    result.push(firstWay);
                    break;
                }

                result.push(firstWay);
            }

            for (const number of fullLength) {
                let firstWay = finalSquare - number - number * 10;
                if (!validateSquare(firstWay)) break;

                if (isLocatedOnAnotherPiece(firstWay)) {
                    result.push(firstWay);
                    break;
                }

                result.push(firstWay);
            }

            for (const number of fullLength) {
                let firstWay = finalSquare + number - number * 10;
                if (!validateSquare(firstWay)) break;

                if (isLocatedOnAnotherPiece(firstWay)) {
                    result.push(firstWay);
                    break;
                }

                result.push(firstWay);
            }

            for (const number of fullLength) {
                let firstWay = finalSquare - number + number * 10;
                if (!validateSquare(firstWay)) break;

                if (isLocatedOnAnotherPiece(firstWay)) {
                    result.push(firstWay);
                    break;
                }

                result.push(firstWay);
            }

            continue;
        }

        // n
        if (m.x === "n" && m.y === "n") {
            console.log("handle special case");
        } else if (m.x === "n" || m.y === "n") {
            const xIsInfinite = m.x === "n";

            for (let number of fullLength) {
                let finalSquare = square.toString();

                if (xIsInfinite) {
                    finalSquare = number.toString() + finalSquare.slice(1);
                } else {
                    finalSquare = finalSquare.slice(0, -1) + number.toString();
                }

                if (square.toString() === finalSquare) continue;
                if (!validateSquare(finalSquare)) continue;
                if (isLocatedOnAnotherPiece(Number(finalSquare))) continue;

                result.push(Number(finalSquare));
            }

            continue;
        }

        const pawnMove = moveService.preparePawnMove(m, metaData, config);
        if (validateSquare(square)) result.push(pawnMove);
    }

    return result;
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
