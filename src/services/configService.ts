let playerIsWhiteCache = false;

const playerIsWhite = () => {
    if (playerIsWhiteCache) return playerIsWhiteCache;

    const playerIsWhite = document
        .querySelector("div.piece:nth-child(25)")
        ?.classList[1].startsWith("w");

    playerIsWhiteCache = playerIsWhite;
    return playerIsWhite;
};

export const configService = { playerIsWhite };
