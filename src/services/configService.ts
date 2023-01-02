const playerIsWhite = () => {
    return document
        .querySelector("div.piece:nth-child(25)")
        ?.classList[1].startsWith("w");
};

export const configService = { playerIsWhite };
