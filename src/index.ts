import { main } from "./main";

const IS_TM_SCRIPT = document.readyState === "interactive";

const run = () => {
    const success = main();

    if (success) {
        console.log("%c Chess helper initialized!", "color: lightgreen");
    } else {
        console.error("%c Failed to initialize application", "color: lightred");
    }
};

if (IS_TM_SCRIPT) {
    window.onload = () => run();
} else {
    run();
}

export {};
