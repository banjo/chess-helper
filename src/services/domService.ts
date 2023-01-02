const createElement = ({
    type,
    classes,
}: {
    type: string;
    classes: string[];
}) => {
    const element = document.createElement("div");

    classes.forEach((c) => element.classList.add(c));

    return element;
};

export const domService = { createElement };
