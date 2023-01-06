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

const IS_TM_SCRIPT = document.readyState === "interactive";
const TIMEOUT_BEFORE_START = 2000;

const run = () => {
    console.log("%c Chess helper starting...", "color: lightblue");
    setTimeout(() => {
        const success = main();

        if (success) {
            console.log("%c Chess helper initialized!", "color: lightgreen");
        } else {
            console.error(
                "%c Failed to initialize application",
                "color: lightred"
            );
        }
    }, TIMEOUT_BEFORE_START);
};

if (IS_TM_SCRIPT) {
    window.onload = () => run();
} else {
    run();
}

export {};
