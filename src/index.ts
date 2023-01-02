import { eventService } from "./services/eventService";
import { configService } from "./services/configService";
import { Config } from "./types";

const main = () => {
    const board = document.querySelector("#board-board");
    if (board === null) return;

    const config: Config = {
        playerIsWhite: configService.playerIsWhite(),
    };

    eventService.addLeftClickEvent(board);
    eventService.addRightClickEvent(board, config);
};

window.onload = () => {
    main();
};

export {};
