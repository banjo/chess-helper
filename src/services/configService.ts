let playerIsWhiteCache = false;

const playerIsWhite = () => {
    if (playerIsWhiteCache) return playerIsWhiteCache;

    const firstCoordinateIsEight =
        document.querySelector(".coordinates").childNodes[0].textContent ===
        "8";

    playerIsWhiteCache = firstCoordinateIsEight;
    return firstCoordinateIsEight;
};

const init = () => {
    playerIsWhite();
};

export const configService = { playerIsWhite, init };
