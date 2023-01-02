let chessTypes = {
    p: "pawn",
    r: "rook",
    n: "knight",
    b: "bishop",
    q: "queen",
    k: "king",
};

let typeMoves = {
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
};

let fullLength = [1, 2, 3, 4, 5, 6, 7, 8];

const isLocatedOnAnotherPiece = (square) => {
    const current = document.querySelector(`.square-${square}`);

    const isOnPiece = (current) => {
        return current?.classList[0] === "piece";
    };

    return isOnPiece(current);
};

const validateSquare = (square) => {
    let squareAsNumber = Number(square);
    let squareAsString = squareAsNumber.toString();
    if (Number(squareAsString[0]) > 8 || Number(squareAsString[0]) < 1)
        return false;
    if (Number(squareAsString[1]) > 8 || Number(squareAsString[1]) < 1)
        return false;

    return true;
};

const getPossibleMoveSquares = (moves, metaData) => {
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
                if (isLocatedOnAnotherPiece(finalSquare)) continue;

                result.push(Number(finalSquare));
            }

            continue;
        }

        // pawn
        const isWhitePlayerAndWhitePiece = playerIsWhite && metaData.isWhite;

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

const clearSquare = () => {
    const toRemove = b?.querySelectorAll(".doRemove");

    for (const element of toRemove as any) {
        element?.parentNode?.removeChild(element);
    }
};

const getMetaData = (target) => {
    if (target instanceof SVGElement) return null;

    if (!target?.className?.includes("piece")) return null;

    const data = target.className.split(" ");
    const square = data[2].split("-")[1];
    return {
        isWhite: data[1].startsWith("b") ? false : true,
        type: chessTypes[data[1][1]],
        square,
    };
};

let b = document.querySelector("#board-board");

const playerIsWhite = document
    .querySelector("div.piece:nth-child(25)")
    ?.classList[1].startsWith("w");

b?.addEventListener("click", (e) => {
    clearSquare();
});

b?.addEventListener("contextmenu", (e) => {
    const target = e.target;

    const metaData = getMetaData(target);

    console.log(metaData?.square);

    if (metaData === null) return;

    const moves = typeMoves[metaData.type];

    const possibleMoves = getPossibleMoveSquares(moves, metaData);

    possibleMoves.forEach((m) => {
        const element = document.createElement("div");
        element.classList.add("hint");
        element.classList.add(`square-${m}`);
        element.classList.add("doRemove");
        element.style.backgroundColor = "darkgray";
        element.style.opacity = "0.5";
        b?.appendChild(element);
    });
});

export {};
