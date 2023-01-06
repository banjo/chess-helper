import { eventService } from "./services/eventService";

export const main = () => {
    try {
        const leftClickSuccess = eventService.addLeftClickEvent();
        const rightClickSuccess = eventService.addRightClickEvent();

        if (!leftClickSuccess || !rightClickSuccess) return false;

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
