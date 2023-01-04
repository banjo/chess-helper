const createElement = ({
    type,
    classes,
}: {
    type: string;
    classes: string[];
}) => {
    const element = document.createElement(type);

    classes.forEach((c) => element.classList.add(c));

    return element;
};

const getBoard = (): Element | null => {
    const board = document.querySelector("chess-board");
    if (board === null) return;

    return board;
};
export const domService = { createElement, getBoard };
