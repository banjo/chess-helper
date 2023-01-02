import { chessMoves } from "./models/chessMoves";
import { chessTypes } from "./models/chessTypes";
import { squareService } from "./services/squareService";

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



const main = () => {
    const board = document.querySelector("#board-board");
    const config = {
        playerIsWhite: true,
    };

    if (board === null) return;

    config.playerIsWhite = document
        .querySelector("div.piece:nth-child(25)")
        ?.classList[1].startsWith("w");

    board.addEventListener("click", (e) => {
        squareService.clearSquare(board);
    });

    board.addEventListener("contextmenu", (e) => {
        const target = e.target;
        const metaData = getMetaData(target);

        if (metaData === null) return;

        const moves = chessMoves[metaData.type];

        const possibleMoves = squareService.getPossibleMoveSquares(
            moves,
            metaData,
            config
        );

        possibleMoves.forEach((m) => {
            const element = document.createElement("div");
            element.classList.add("hint");
            element.classList.add(`square-${m}`);
            element.classList.add("doRemove");
            element.style.backgroundColor = "darkgray";
            element.style.opacity = "0.5";
            board?.appendChild(element);
        });
    });
};

window.onload = () => {
    main();
};

export {};
