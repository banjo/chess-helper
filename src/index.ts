import { eventService } from "./services/eventService";
import { configService } from "./services/configService";
import { Config } from "./types";

const main = () => {
    const config: Config = {
        playerIsWhite: configService.playerIsWhite(),
    };

    eventService.addLeftClickEvent();
    eventService.addRightClickEvent();

    return true;
};

window.onload = () => {
    const success = main();

    if (success) {
        console.log("Chess game started");
    } else {
        console.error("Failed to initialize application");
    }
};

export {};
