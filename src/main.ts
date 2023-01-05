import { configService } from "./services/configService";
import { eventService } from "./services/eventService";
import { Config } from "./types";

export const main = () => {
    const config: Config = {
        playerIsWhite: configService.playerIsWhite(),
    };

    eventService.addLeftClickEvent();
    eventService.addRightClickEvent();

    return true;
};
