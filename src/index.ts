import { eventService } from "./services/eventService";
import { configService } from "./services/configService";
import { Config } from "./types";

const main = () => {
    const config: Config = {
        playerIsWhite: configService.playerIsWhite(),
    };

    eventService.addLeftClickEvent();
    eventService.addRightClickEvent();
};

window.onload = () => {
    main();
};

export {};
