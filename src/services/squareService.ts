let fullLength = [1, 2, 3, 4, 5, 6, 7, 8];

const clearSquare = (board: HTMLElement) => {
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

        // pawn
        const isWhitePlayerAndWhitePiece =
            config.playerIsWhite && metaData.isWhite;

        if (m.x !== 0) {
            if (metaData.type === "pawn" && !isWhitePlayerAndWhitePiece) {
                square = square - m.x * 10;
            } else {
                square = square + m.x * 10;
            }
        }

        if (m.y !== 0) {
            if (metaData.type === "pawn" && !isWhitePlayerAndWhitePiece) {
                square = square - m.y;
            } else {
                square = square + m.y;
            }
        }

        if (validateSquare(square)) result.push(square);
    }

    return result;
};

export const squareService = {
    clearSquare,
    validateSquare,
    isLocatedOnAnotherPiece,
    getPossibleMoveSquares,
};
