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

Generated code is located in `dist/index.js`. The easiest way to activate it is to paste it in the console of the chess page.

Another way is to create a Userscript with Tampermonkey:

```js
// ==UserScript==
// @name         Chess helper
// @namespace    http://chess.com/
// @version      0.1
// @description  Chess helper
// @author       You
// @match        https://www.chess.com/*
// @require      https://raw.githubusercontent.com/banjo/chess-helper/main/dist/index.js
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