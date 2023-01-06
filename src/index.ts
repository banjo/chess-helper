// ==UserScript==
// @name         Chess helper
// @namespace    http://chess.com/
// @version      0.1
// @description  Chess helper
// @author       You
// @match        https://www.chess.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

import { main } from "./main";
import { domService } from "./services/domService";

const IS_TM_SCRIPT = document.readyState === "interactive";
const TIMEOUT_BEFORE_START = 2000;

const init = () => {
    let success = true;
    try {
        success = main();
    } catch (error) {
        console.error(error);
        success = false;
    }

    if (success) {
        console.log("%c Chess helper initialized!", "color: lightgreen");
    } else {
        console.error("%c Failed to initialize application", "color: lightred");
    }
};

const run = () => {
    console.log("%c Chess helper starting...", "color: lightblue");

    const boardExists = domService.getBoard();
    if (boardExists) {
        init();
        return;
    }

    console.log("%c Board not found, waiting...", "color: lightblue");
    const startup = setInterval(() => {
        const correctBoard = domService.getBoard();

        if (correctBoard) {
            clearInterval(startup);
            init();
        }
    }, TIMEOUT_BEFORE_START);
};

if (IS_TM_SCRIPT) {
    window.onload = () => {
        setTimeout(run, TIMEOUT_BEFORE_START);
    };
} else {
    run();
}

export {};
