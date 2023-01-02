import { eventService } from "./services/eventService";
import { configService } from "./services/configService";

const main = () => {
    const board = document.querySelector("#board-board");
    if (board === null) return;

    const config = {
        playerIsWhite: configService.playerIsWhite(),
    };

    eventService.addLeftClickEvent(board);
    eventService.addRightClickEvent(board, config);
};

window.onload = () => {
    main();
};

export {};
