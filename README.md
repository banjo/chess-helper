# Chess Helper

A fun side project to add helper lines to the chess board at chess.com.

![chess.com helper ](https://i.imgur.com/T3IFNjS.png)

> DISCLAIMER: This is only for educational purposes and should not be used in real games.

## Features

* Right-click on any piece to activate helper mode.
* Left-click to inactivate.
* Show possible moves for any piece (black or white).
* Show if possible move can result in a loss of piece.
* Show how many pieces that covers a possible move (including on opponent pieces).
* Show if a capture is safe or not.
* Show all own pieces that is under threat.
* Show all possible captures that won't sacrifice a piece

## Usage

Generated code is located in `dist/index.user.js`. The easiest way to activate it is to paste it to the console and execute it when the chessboard is open.

Another way is to create a Userscript with Tampermonkey/ViolentMonkey/Greasemonkey. There are 3 ways to you can that:

* Include the script with the `require` statement (see below)
* Copy the content from `dist/index.user.js` and paste into own script
* Import a script from URL and choose: `https://raw.githubusercontent.com/banjo/chess-helper/main/dist/index.user.js`

```js
// ==UserScript==
// @name         Chess helper
// @namespace    http://chess.com/
// @version      0.1
// @description  Chess helper
// @author       You
// @match        https://www.chess.com/*
// @require      https://raw.githubusercontent.com/banjo/chess-helper/main/dist/index.user.js
// @downloadURL  https://raw.githubusercontent.com/banjo/chess-helper/main/dist/index.user.js
// @updateURL    https://raw.githubusercontent.com/banjo/chess-helper/main/dist/index.user.js
// @run-at       document-end
// @grant        none
// ==/UserScript==
```

> DISCLAIMER: DO NOT USE IN REAL GAMES.

## Explanation

### Selected piece (default in chess.com)

![](https://i.imgur.com/t93eGoC.png)

### Possible move

![possible move](https://i.imgur.com/j4FzGhq.png)


### Possible capture that is covered by opponent piece

![](https://i.imgur.com/R1WHcWP.png)

### Possible move covered by multiple opponent pieces

![](https://i.imgur.com/qFP2FjE.png)

### Own piece under threat from opponent piece

![](https://i.imgur.com/WRFpUrA.png)

### Safe capture

![](https://i.imgur.com/qFm06KS.png)

### Safe capture from any piece

![](https://i.imgur.com/OzdF3U5.png)

## Examples

### Own pieces under threat

![](https://i.imgur.com/L2zJbW4.png)

### Basic functionality

![](https://i.imgur.com/GrSSjcA.png)

### All possible captures that won't sacrifice a piece

![](https://i.imgur.com/qvaJP4p.png)