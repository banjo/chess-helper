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
let $f767aab2036cb9c8$var$playerIsWhiteCache = false;
const $f767aab2036cb9c8$var$playerIsWhite = ()=>{
    if ($f767aab2036cb9c8$var$playerIsWhiteCache) return $f767aab2036cb9c8$var$playerIsWhiteCache;
    const firstCoordinateIsEight = document.querySelector(".coordinates").childNodes[0].textContent === "8";
    $f767aab2036cb9c8$var$playerIsWhiteCache = firstCoordinateIsEight;
    return firstCoordinateIsEight;
};
const $f767aab2036cb9c8$var$init = ()=>{
    $f767aab2036cb9c8$var$playerIsWhite();
};
const $f767aab2036cb9c8$export$f60151a8e92c6a2d = {
    playerIsWhite: $f767aab2036cb9c8$var$playerIsWhite,
    init: $f767aab2036cb9c8$var$init
};


const $5a41ec06dd98719a$var$createElement = ({ type: type , classes: classes  })=>{
    const element = document.createElement(type);
    classes.forEach((c)=>element.classList.add(c));
    return element;
};
const $5a41ec06dd98719a$var$getBoard = ()=>{
    const board = document.querySelector("chess-board");
    if (!board) return null;
    return board;
};
const $5a41ec06dd98719a$export$6fddb0d16b9dea63 = {
    createElement: $5a41ec06dd98719a$var$createElement,
    getBoard: $5a41ec06dd98719a$var$getBoard
};


const $74892fecc95a5cc6$export$f222e06b09a42d9b = {
    pawn: [
        {
            x: 0,
            y: 1,
            condition: [
                "base"
            ]
        },
        {
            x: 0,
            y: 2,
            condition: [
                "isFirstMove"
            ]
        },
        {
            y: 1,
            x: 1,
            condition: [
                "canAttack"
            ]
        },
        {
            y: 1,
            x: -1,
            condition: [
                "canAttack"
            ]
        }
    ],
    rook: [
        {
            y: "n",
            x: 0
        },
        {
            y: 0,
            x: "n"
        }
    ],
    bishop: [
        {
            y: "n1",
            x: "n1"
        }
    ],
    queen: [
        {
            y: "n1",
            x: "n1"
        },
        {
            y: "n",
            x: 0
        },
        {
            y: 0,
            x: "n"
        }
    ],
    knight: [
        {
            y: 2,
            x: 1,
            condition: [
                "always"
            ]
        },
        {
            y: 2,
            x: -1,
            condition: [
                "always"
            ]
        },
        {
            y: -2,
            x: 1,
            condition: [
                "always"
            ]
        },
        {
            y: -2,
            x: -1,
            condition: [
                "always"
            ]
        },
        {
            y: 1,
            x: 2,
            condition: [
                "always"
            ]
        },
        {
            y: 1,
            x: -2,
            condition: [
                "always"
            ]
        },
        {
            y: -1,
            x: 2,
            condition: [
                "always"
            ]
        },
        {
            y: -1,
            x: -2,
            condition: [
                "always"
            ]
        }
    ],
    king: [
        {
            y: 1,
            x: 0,
            condition: [
                "isSafe"
            ]
        },
        {
            y: 1,
            x: 1,
            condition: [
                "isSafe"
            ]
        },
        {
            y: 1,
            x: -1,
            condition: [
                "isSafe"
            ]
        },
        {
            y: -1,
            x: 0,
            condition: [
                "isSafe"
            ]
        },
        {
            y: -1,
            x: 1,
            condition: [
                "isSafe"
            ]
        },
        {
            y: -1,
            x: -1,
            condition: [
                "isSafe"
            ]
        },
        {
            y: 0,
            x: 1,
            condition: [
                "isSafe"
            ]
        },
        {
            y: 0,
            x: -1,
            condition: [
                "isSafe"
            ]
        },
        // castling moves
        {
            y: 0,
            x: 2,
            condition: [
                "isSafe",
                "isFirstMove",
                "towerUntouched",
                "castling"
            ]
        },
        {
            y: 0,
            x: -2,
            condition: [
                "isSafe",
                "isFirstMove",
                "towerUntouched",
                "castling"
            ]
        }
    ]
};


const $33352b3a45ac5995$export$db2ab20b8494bcc = {
    p: "pawn",
    r: "rook",
    n: "knight",
    b: "bishop",
    q: "queen",
    k: "king"
};




const $3f00889156601b74$var$ALTERATION_FIRST = 10;
const $3f00889156601b74$var$ALTERATION_LAST = 1;
const $3f00889156601b74$export$b09fb900337259de = (square, metaData, startSquare = null)=>{
    startSquare = startSquare ?? Number(square);
    let current = Number(square);
    let isOnPiece = false;
    let isOnEnemyPiece = false;
    let isOnEndOfBoard = false;
    let isOutsideBoard = false;
    let isActivePiece = true; // active meaning that the move is valid. For example, a pawn can attack diagonally, but only if there is a piece there. Meaning that that square is registered as a move, but not active.
    let canAttack = true; // can be false if the piece cannot overtake another piece even though the move can be done.
    const validate = ()=>{
        const info = (0, $1527f3817f23dd44$export$24c7ddd08b7e5376).getCurrentLocationPieceInfo(current, startSquare);
        if (info) {
            isOnPiece = info.isOnPiece;
            isOnEnemyPiece = info.isOnEnemyPiece;
        } else {
            isOnPiece = false;
            isOnEnemyPiece = false;
        }
        if ((0, $1527f3817f23dd44$export$24c7ddd08b7e5376).isLocatedOnEndOfBoard(current)) isOnEndOfBoard = true;
        if ((0, $1527f3817f23dd44$export$24c7ddd08b7e5376).isOutsideOfBoard(current)) isOutsideBoard = true;
    };
    validate();
    const getFirst = ()=>Number(String(current).charAt(0));
    const getLast = ()=>Number(String(current).charAt(1));
    const moveRight = ()=>{
        current += $3f00889156601b74$var$ALTERATION_FIRST;
        validate();
        return $3f00889156601b74$export$b09fb900337259de(current, metaData, startSquare);
    };
    const moveLeft = ()=>{
        current -= $3f00889156601b74$var$ALTERATION_FIRST;
        validate();
        return $3f00889156601b74$export$b09fb900337259de(current, metaData, startSquare);
    };
    const moveUp = ()=>{
        current += $3f00889156601b74$var$ALTERATION_LAST;
        validate();
        return $3f00889156601b74$export$b09fb900337259de(current, metaData, startSquare);
    };
    const moveDown = ()=>{
        current -= $3f00889156601b74$var$ALTERATION_LAST;
        validate();
        return $3f00889156601b74$export$b09fb900337259de(current, metaData, startSquare);
    };
    const setActivePiece = (active)=>{
        isActivePiece = active;
    };
    const setCanAttack = (attacking)=>{
        canAttack = attacking;
    };
    return {
        getStartSquareNumber: ()=>startSquare,
        getStartSquare: ()=>$3f00889156601b74$export$b09fb900337259de(startSquare, metaData),
        getFirst: getFirst,
        getLast: getLast,
        getCurrent: ()=>current,
        getMetaData: ()=>metaData,
        moveRight: moveRight,
        moveLeft: moveLeft,
        moveUp: moveUp,
        moveDown: moveDown,
        setActivePiece: setActivePiece,
        setCanAttack: setCanAttack,
        isActivePiece: ()=>isActivePiece,
        canAttack: ()=>canAttack,
        isOnPiece: ()=>isOnPiece,
        isOnEnemyPiece: ()=>isOnEnemyPiece,
        isOnEndOfBoard: ()=>isOnEndOfBoard,
        isOutsideBoard: ()=>isOutsideBoard,
        isOnRow: (row)=>getLast() === row,
        getSquare: ()=>$3f00889156601b74$export$b09fb900337259de(current, metaData, startSquare)
    };
};


const $4b670eb746279c44$var$handleRepeatedMoveUntilBreak = (square, moves, callback)=>{
    let tempSquare = square.getSquare();
    while(true){
        tempSquare = callback(tempSquare);
        if (tempSquare?.isOutsideBoard() || tempSquare === null) break;
        if (tempSquare.isOnPiece()) {
            if (tempSquare.isOnEnemyPiece()) moves.push(tempSquare.getSquare());
            else {
                tempSquare.setActivePiece(false);
                moves.push(tempSquare.getSquare());
            }
            break;
        }
        moves.push(tempSquare.getSquare());
    }
};
const $4b670eb746279c44$var$handleAxis = (axis, square, moveOnAxis)=>{
    const isPositive = moveOnAxis > 0;
    const isNegative = moveOnAxis < 0;
    if (isPositive) for(let i = 0; i < moveOnAxis; i++){
        if (axis === "y") square.moveUp();
        if (axis === "x") square.moveRight();
    }
    if (isNegative) for(let i1 = 0; i1 > moveOnAxis; i1--){
        if (axis === "y") square.moveDown();
        if (axis === "x") square.moveLeft();
    }
};
const $4b670eb746279c44$var$prepareKingMove = (move, metaData)=>{
    const x = move.x;
    const y = move.y;
    if (Number.isNaN(x) || Number.isNaN(y)) {
        console.log("Both need to be numbers");
        return null;
    }
    const square = (0, $3f00889156601b74$export$b09fb900337259de)(metaData.square, metaData);
    // TODO: handle castling
    if (move.condition?.includes("castling")) return null;
    $4b670eb746279c44$var$handleAxis("x", square, x);
    $4b670eb746279c44$var$handleAxis("y", square, y);
    return square;
};
const $4b670eb746279c44$var$prepareKnightMove = (move, metaData)=>{
    const x = move.x;
    const y = move.y;
    if (Number.isNaN(x) || Number.isNaN(y)) {
        console.log("Both need to be numbers");
        return null;
    }
    const square = (0, $3f00889156601b74$export$b09fb900337259de)(metaData.square, metaData);
    $4b670eb746279c44$var$handleAxis("x", square, x);
    $4b670eb746279c44$var$handleAxis("y", square, y);
    return square;
};
const $4b670eb746279c44$var$prepareN1Moves = (move, metaData)=>{
    let moves = [];
    if (move.x !== "n1" || move.y !== "n1") {
        console.log("Both need to be n1");
        return moves;
    }
    const startSquare = (0, $3f00889156601b74$export$b09fb900337259de)(metaData.square, metaData);
    $4b670eb746279c44$var$handleRepeatedMoveUntilBreak(startSquare, moves, (square)=>{
        square.moveUp();
        return square.moveRight();
    });
    $4b670eb746279c44$var$handleRepeatedMoveUntilBreak(startSquare, moves, (square)=>{
        square.moveUp();
        return square.moveLeft();
    });
    $4b670eb746279c44$var$handleRepeatedMoveUntilBreak(startSquare, moves, (square)=>{
        square.moveDown();
        return square.moveRight();
    });
    $4b670eb746279c44$var$handleRepeatedMoveUntilBreak(startSquare, moves, (square)=>{
        square.moveDown();
        return square.moveLeft();
    });
    return moves;
};
const $4b670eb746279c44$var$prepareNMoves = (move, metaData)=>{
    let moves = [];
    if (move.x === "n" && move.y === "n") {
        console.log("handle special case");
        return moves;
    }
    if (move.x !== "n" && move.y !== "n") {
        console.log("Cannot have both x and y as n");
        return moves;
    }
    const handleVertical = move.y === "n";
    const square = (0, $3f00889156601b74$export$b09fb900337259de)(metaData.square, metaData);
    if (handleVertical) {
        $4b670eb746279c44$var$handleRepeatedMoveUntilBreak(square, moves, (square)=>square.moveUp());
        $4b670eb746279c44$var$handleRepeatedMoveUntilBreak(square, moves, (square)=>square.moveDown());
    } else {
        $4b670eb746279c44$var$handleRepeatedMoveUntilBreak(square, moves, (square)=>square.moveRight());
        $4b670eb746279c44$var$handleRepeatedMoveUntilBreak(square, moves, (square)=>square.moveLeft());
    }
    return moves;
};
const $4b670eb746279c44$var$preparePawnMove = (move, metaData)=>{
    let square = (0, $3f00889156601b74$export$b09fb900337259de)(metaData.square, metaData);
    const isWhitePlayerAndWhitePiece = (0, $f767aab2036cb9c8$export$f60151a8e92c6a2d).playerIsWhite() && metaData.isWhite;
    const checkIfFirstMove = (square)=>{
        if (isWhitePlayerAndWhitePiece) return square.getSquare().isOnRow(2);
        else return square.getSquare().isOnRow(7);
    };
    const isFirstMove = checkIfFirstMove(square);
    const handleAxis = (axis, move, metaData, callbacks)=>{
        const value = move[axis];
        if (value !== 0 && Number.isInteger(value)) {
            let x = value;
            const isPositive = x > 0;
            if (isWhitePlayerAndWhitePiece) for(let i = 0; i < Math.abs(x); i++){
                if (isPositive) callbacks.whiteAndPositive(square);
                else callbacks.whiteAndNegative(square);
                if (square.isOnPiece()) break;
            }
            else for(let i1 = 0; i1 < Math.abs(x); i1++){
                if (isPositive) callbacks.blackAndPositive(square);
                else callbacks.blackAndNegative(square);
                if (square.isOnPiece()) break;
            }
        }
    };
    handleAxis("y", move, metaData, {
        blackAndPositive: (square)=>square.moveDown(),
        blackAndNegative: (square)=>square.moveUp(),
        whiteAndPositive: (square)=>square.moveUp(),
        whiteAndNegative: (square)=>square.moveDown()
    });
    handleAxis("x", move, metaData, {
        blackAndPositive: (square)=>square.moveLeft(),
        blackAndNegative: (square)=>square.moveRight(),
        whiteAndPositive: (square)=>square.moveRight(),
        whiteAndNegative: (square)=>square.moveLeft()
    });
    if (move?.condition?.includes("isFirstMove") && !isFirstMove) return null;
    if (move?.condition?.includes("isFirstMove") && isFirstMove && square.isOnPiece()) {
        square.setCanAttack(false);
        square.setActivePiece(false);
        return square;
    }
    if (move?.condition?.includes("isFirstMove") && isFirstMove) {
        square.setCanAttack(false);
        return square;
    }
    if (move?.condition?.includes("canAttack") && !square.isOnEnemyPiece()) {
        square.setActivePiece(false);
        return square;
    }
    if (move?.condition?.includes("canAttack") && square.isOnEnemyPiece()) {
        square.setCanAttack(true);
        return square;
    }
    if (!move?.condition?.includes("canAttack") && square.isOnPiece()) {
        square.setActivePiece(false);
        square.setCanAttack(false);
        return square;
    }
    if (move?.condition?.includes("base")) {
        square.setCanAttack(false);
        return square;
    }
    return square;
};
const $4b670eb746279c44$export$3e4aed8978c9ebda = {
    preparePawnMove: $4b670eb746279c44$var$preparePawnMove,
    prepareKnightMove: $4b670eb746279c44$var$prepareKnightMove,
    prepareKingMove: $4b670eb746279c44$var$prepareKingMove,
    prepareNMoves: $4b670eb746279c44$var$prepareNMoves,
    prepareN1Moves: $4b670eb746279c44$var$prepareN1Moves
};


const $1527f3817f23dd44$var$clearSquare = (board)=>{
    const toRemove = board.querySelectorAll(".doRemove");
    for (const element of toRemove)element?.parentNode?.removeChild(element);
    const highlightsToRemove = board.querySelectorAll(".highlight");
    for (const element1 of highlightsToRemove)element1?.classList?.remove("highlight");
};
const $1527f3817f23dd44$var$getCurrentLocationPieceInfo = (square, start)=>{
    if (square === start) return null;
    const startSquare = Array.from(document.querySelectorAll(`.square-${start}`)).find((e)=>e.classList[0] === "piece");
    const current = Array.from(document.querySelectorAll(`.square-${square}`)).find((e)=>e.classList[0] === "piece");
    const isBlackPiecePlaying = startSquare?.classList[1]?.startsWith("b");
    const isOnPiece = (current)=>{
        return current?.classList[0] === "piece";
    };
    const isStandingOnWhitePiece = (current)=>{
        return current?.classList[1].startsWith("w");
    };
    const isOnEnemy = isBlackPiecePlaying && isStandingOnWhitePiece(current) || !isBlackPiecePlaying && !isStandingOnWhitePiece(current);
    return {
        isOnPiece: isOnPiece(current),
        isOnEnemyPiece: isOnPiece(current) ? isOnEnemy : false
    };
};
const $1527f3817f23dd44$var$isLocatedOnEndOfBoard = (square)=>{
    const first = Number(String(square).charAt(0));
    const last = Number(String(square).charAt(1));
    if (first === 8 || first === 1) return true;
    if (last === 8 || last === 1) return true;
    return false;
};
const $1527f3817f23dd44$var$isOutsideOfBoard = (square)=>{
    const first = Number(String(square).charAt(0));
    const last = Number(String(square).charAt(1));
    if (!first || !last) return true;
    if (first > 8 || first < 1) return true;
    if (last > 8 || last < 1) return true;
    return false;
};
const $1527f3817f23dd44$var$getPossibleMoveSquares = (moves, metaData)=>{
    let totalMoves = [];
    for (const move of moves){
        let tempMoves = [];
        switch(metaData.type){
            case "pawn":
                const pawnMove = (0, $4b670eb746279c44$export$3e4aed8978c9ebda).preparePawnMove(move, metaData);
                if (pawnMove) tempMoves = [
                    pawnMove
                ];
                break;
            case "rook":
                tempMoves = (0, $4b670eb746279c44$export$3e4aed8978c9ebda).prepareNMoves(move, metaData);
                break;
            case "bishop":
                tempMoves = (0, $4b670eb746279c44$export$3e4aed8978c9ebda).prepareN1Moves(move, metaData);
                break;
            case "queen":
                const isNMove = move.x === "n" || move.y === "n";
                if (isNMove) tempMoves = (0, $4b670eb746279c44$export$3e4aed8978c9ebda).prepareNMoves(move, metaData);
                else tempMoves = (0, $4b670eb746279c44$export$3e4aed8978c9ebda).prepareN1Moves(move, metaData);
                break;
            case "knight":
                const knightMove = (0, $4b670eb746279c44$export$3e4aed8978c9ebda).prepareKnightMove(move, metaData);
                if (knightMove) tempMoves = [
                    knightMove
                ];
                break;
            case "king":
                const kingMove = (0, $4b670eb746279c44$export$3e4aed8978c9ebda).prepareKingMove(move, metaData);
                if (kingMove) tempMoves = [
                    kingMove
                ];
                break;
            default:
                console.log("Not implemented yet");
        }
        totalMoves = [
            ...totalMoves,
            ...tempMoves
        ];
    }
    return totalMoves;
};
const $1527f3817f23dd44$var$getMetaDataForSquare = (target)=>{
    if (target instanceof SVGElement) return null;
    if (!target?.className?.includes("piece")) return null;
    const data = target.className.split(" ");
    const pieceInfo = data[1];
    const squareInfo = data[2];
    const square = squareInfo.split("-")[1];
    const pieceAbbreviation = pieceInfo[1];
    return {
        isWhite: pieceInfo.startsWith("b") ? false : true,
        type: (0, $33352b3a45ac5995$export$db2ab20b8494bcc)[pieceAbbreviation],
        square: Number(square)
    };
};
const $1527f3817f23dd44$export$24c7ddd08b7e5376 = {
    clearSquare: $1527f3817f23dd44$var$clearSquare,
    isOutsideOfBoard: $1527f3817f23dd44$var$isOutsideOfBoard,
    getCurrentLocationPieceInfo: $1527f3817f23dd44$var$getCurrentLocationPieceInfo,
    isLocatedOnEndOfBoard: $1527f3817f23dd44$var$isLocatedOnEndOfBoard,
    getPossibleMoveSquares: $1527f3817f23dd44$var$getPossibleMoveSquares,
    getMetaDataForSquare: $1527f3817f23dd44$var$getMetaDataForSquare
};



const $7e2e45e7aa06d1d3$var$moves = [];
const $7e2e45e7aa06d1d3$var$addMoves = (square)=>{
    if (!square) return;
    const validate = (square)=>{
        if ((0, $1527f3817f23dd44$export$24c7ddd08b7e5376).isOutsideOfBoard(square.getCurrent())) return;
        $7e2e45e7aa06d1d3$var$moves.push(square);
    };
    if (Array.isArray(square)) {
        square.forEach(validate);
        return;
    }
    validate(square);
};
const $7e2e45e7aa06d1d3$var$getMoves = ()=>{
    return $7e2e45e7aa06d1d3$var$moves;
};
const $7e2e45e7aa06d1d3$var$clearMoves = ()=>{
    $7e2e45e7aa06d1d3$var$moves.length = 0;
};
const $7e2e45e7aa06d1d3$export$fb3532a5c6f43e0c = {
    addMoves: $7e2e45e7aa06d1d3$var$addMoves,
    getMoves: $7e2e45e7aa06d1d3$var$getMoves,
    clearMoves: $7e2e45e7aa06d1d3$var$clearMoves
};









const $75d4a2723795b22f$var$getCurrentEnemyPieces = ()=>{
    const enemyPieces = Array.from(document.querySelectorAll(".piece")).filter((element)=>{
        const metaData = (0, $1527f3817f23dd44$export$24c7ddd08b7e5376).getMetaDataForSquare(element);
        return metaData?.isWhite !== (0, $f767aab2036cb9c8$export$f60151a8e92c6a2d).playerIsWhite();
    });
    return enemyPieces;
};
const $75d4a2723795b22f$var$getCurrentUserPieces = ()=>{
    const userPieces = Array.from(document.querySelectorAll(".piece")).filter((element)=>{
        const metaData = (0, $1527f3817f23dd44$export$24c7ddd08b7e5376).getMetaDataForSquare(element);
        return metaData?.isWhite === (0, $f767aab2036cb9c8$export$f60151a8e92c6a2d).playerIsWhite();
    });
    return userPieces;
};
const $75d4a2723795b22f$var$getPossibleEnemyMoves = ()=>{
    const enemies = $75d4a2723795b22f$var$getCurrentEnemyPieces().map((element)=>(0, $1527f3817f23dd44$export$24c7ddd08b7e5376).getMetaDataForSquare(element));
    const possibleEnemyMoves = enemies.reduce((accumulator, enemy)=>{
        const moves = (0, $74892fecc95a5cc6$export$f222e06b09a42d9b)[enemy.type];
        const possibleMoves = (0, $1527f3817f23dd44$export$24c7ddd08b7e5376).getPossibleMoveSquares(moves, enemy);
        return [
            ...accumulator,
            ...possibleMoves.filter((s)=>s.canAttack())
        ];
    }, []);
    return possibleEnemyMoves;
};
const $75d4a2723795b22f$var$getPossibleUserMoves = ()=>{
    const userPieces = $75d4a2723795b22f$var$getCurrentUserPieces().map((element)=>(0, $1527f3817f23dd44$export$24c7ddd08b7e5376).getMetaDataForSquare(element));
    const possibleUserMoves = userPieces.reduce((accumulator, userPiece)=>{
        const moves = (0, $74892fecc95a5cc6$export$f222e06b09a42d9b)[userPiece.type];
        const possibleMoves = (0, $1527f3817f23dd44$export$24c7ddd08b7e5376).getPossibleMoveSquares(moves, userPiece);
        return [
            ...accumulator,
            ...possibleMoves.filter((s)=>s.canAttack())
        ];
    }, []);
    return possibleUserMoves;
};
const $75d4a2723795b22f$export$53addacd09add6c1 = {
    getPossibleEnemyMoves: $75d4a2723795b22f$var$getPossibleEnemyMoves,
    getPossibleUserMoves: $75d4a2723795b22f$var$getPossibleUserMoves,
    getCurrentEnemyPieces: $75d4a2723795b22f$var$getCurrentEnemyPieces,
    getCurrentUserPieces: $75d4a2723795b22f$var$getCurrentUserPieces
};


const $03077d7171343e18$var$BACKGROUND_COLORS = {
    green: "lightgreen",
    gray: "lightgray",
    red: "red",
    orange: "orange"
};
const $03077d7171343e18$var$showPiecesInDanger = ({ board: board , currentUserPieces: currentUserPieces , possibleEnemyMoves: possibleEnemyMoves  })=>{
    currentUserPieces.forEach((piece)=>{
        const squareMetaData = (0, $1527f3817f23dd44$export$24c7ddd08b7e5376).getMetaDataForSquare(piece);
        const isPieceInDanger = possibleEnemyMoves.some((s)=>s.getCurrent() === squareMetaData.square);
        const element = (0, $5a41ec06dd98719a$export$6fddb0d16b9dea63).createElement({
            type: "div",
            classes: [
                "capture-hint",
                `square-${squareMetaData.square}`,
                "doRemove"
            ]
        });
        if (isPieceInDanger) {
            element.style.borderWidth = "8px";
            element.style.borderColor = $03077d7171343e18$var$BACKGROUND_COLORS.red;
            element.style.opacity = "0.5";
            board?.appendChild(element);
        }
    });
};
const $03077d7171343e18$var$showPossibleMoves = ({ board: board , activeMoves: activeMoves , possibleEnemyMoves: possibleEnemyMoves  })=>{
    activeMoves.forEach((square)=>{
        if (square === null || square === undefined) return;
        if (square.getCurrent() === square.getStartSquareNumber()) return;
        if (square.isOnPiece() && !square.isOnEnemyPiece()) return;
        const classes = [
            "hint",
            `square-${square.getCurrent()}`,
            "doRemove"
        ];
        if (square.isOnEnemyPiece()) classes.push("enemy");
        const element = (0, $5a41ec06dd98719a$export$6fddb0d16b9dea63).createElement({
            type: "div",
            classes: classes
        });
        const isPossibleEnemyMove = possibleEnemyMoves.some((s)=>s.getCurrent() === square.getCurrent());
        const isUserPiece = (0, $f767aab2036cb9c8$export$f60151a8e92c6a2d).playerIsWhite() && square.getMetaData().isWhite || !(0, $f767aab2036cb9c8$export$f60151a8e92c6a2d).playerIsWhite() && !square.getMetaData().isWhite;
        const pieceCoveredByAmount = possibleEnemyMoves.filter((s)=>s.getCurrent() === square.getCurrent()).length;
        let color = $03077d7171343e18$var$BACKGROUND_COLORS.gray;
        if (isUserPiece) {
            if (isPossibleEnemyMove && square.isOnEnemyPiece()) color = $03077d7171343e18$var$BACKGROUND_COLORS.orange;
            else if (isPossibleEnemyMove) color = $03077d7171343e18$var$BACKGROUND_COLORS.orange;
            else if (square.isOnEnemyPiece()) color = $03077d7171343e18$var$BACKGROUND_COLORS.green;
            if (pieceCoveredByAmount > 1) {
                element.textContent = pieceCoveredByAmount.toString();
                element.style.display = "grid";
                element.style.placeItems = "center";
            }
        }
        element.style.backgroundColor = color;
        element.style.opacity = "0.5";
        board?.appendChild(element);
    });
};
const $03077d7171343e18$var$showPossibleFreeCaptures = ({ board: board , allPossibleUserMoves: allPossibleUserMoves , possibleEnemyMoves: possibleEnemyMoves  })=>{
    allPossibleUserMoves.forEach((square)=>{
        if (square === null || square === undefined) return;
        if (square.getCurrent() === square.getStartSquareNumber()) return;
        if (square.isOnPiece() && !square.isOnEnemyPiece()) return;
        if (!square.isOnEnemyPiece()) return;
        const isPossibleEnemyMove = possibleEnemyMoves.some((s)=>s.getCurrent() === square.getCurrent());
        const isUserPiece = (0, $f767aab2036cb9c8$export$f60151a8e92c6a2d).playerIsWhite() && square.getMetaData().isWhite || !(0, $f767aab2036cb9c8$export$f60151a8e92c6a2d).playerIsWhite() && !square.getMetaData().isWhite;
        const classes = [
            "capture-hint",
            `square-${square.getCurrent()}`,
            "doRemove"
        ];
        const element = (0, $5a41ec06dd98719a$export$6fddb0d16b9dea63).createElement({
            type: "div",
            classes: classes
        });
        if (isUserPiece && !isPossibleEnemyMove) {
            element.style.borderWidth = "8px";
            element.style.borderColor = $03077d7171343e18$var$BACKGROUND_COLORS.green;
            element.style.opacity = "0.5";
            board?.appendChild(element);
        }
    });
};
const $03077d7171343e18$var$displayMoves = ()=>{
    const board = (0, $5a41ec06dd98719a$export$6fddb0d16b9dea63).getBoard();
    const possibleEnemyMoves = (0, $75d4a2723795b22f$export$53addacd09add6c1).getPossibleEnemyMoves();
    const moves = (0, $7e2e45e7aa06d1d3$export$fb3532a5c6f43e0c).getMoves(); // moves for that particlar piece
    const activeMoves = moves.filter((s)=>s.isActivePiece());
    const currentUserPieces = (0, $75d4a2723795b22f$export$53addacd09add6c1).getCurrentUserPieces();
    const allPossibleUserMoves = (0, $75d4a2723795b22f$export$53addacd09add6c1).getPossibleUserMoves();
    $03077d7171343e18$var$showPiecesInDanger({
        board: board,
        currentUserPieces: currentUserPieces,
        possibleEnemyMoves: possibleEnemyMoves
    });
    $03077d7171343e18$var$showPossibleMoves({
        board: board,
        activeMoves: activeMoves,
        possibleEnemyMoves: possibleEnemyMoves
    });
    $03077d7171343e18$var$showPossibleFreeCaptures({
        board: board,
        allPossibleUserMoves: allPossibleUserMoves,
        possibleEnemyMoves: possibleEnemyMoves
    });
};
const $03077d7171343e18$export$a5488e3692cee4f1 = {
    displayMoves: $03077d7171343e18$var$displayMoves
};


let $4eba5d2f5338bd41$var$firstRun = true;
const $4eba5d2f5338bd41$var$addLeftClickEvent = ()=>{
    const board = (0, $5a41ec06dd98719a$export$6fddb0d16b9dea63).getBoard();
    if (board === null) return false;
    board.addEventListener("click", (e)=>{
        (0, $1527f3817f23dd44$export$24c7ddd08b7e5376).clearSquare(board);
        (0, $7e2e45e7aa06d1d3$export$fb3532a5c6f43e0c).clearMoves();
    });
    return true;
};
const $4eba5d2f5338bd41$var$addRightClickEvent = ()=>{
    if ($4eba5d2f5338bd41$var$firstRun) {
        (0, $f767aab2036cb9c8$export$f60151a8e92c6a2d).init();
        $4eba5d2f5338bd41$var$firstRun = false;
    }
    const board = (0, $5a41ec06dd98719a$export$6fddb0d16b9dea63).getBoard();
    if (board === null) return false;
    board.addEventListener("contextmenu", (e)=>{
        (0, $1527f3817f23dd44$export$24c7ddd08b7e5376).clearSquare(board);
        (0, $7e2e45e7aa06d1d3$export$fb3532a5c6f43e0c).clearMoves();
        const target = e.target;
        const metaData = (0, $1527f3817f23dd44$export$24c7ddd08b7e5376).getMetaDataForSquare(target);
        if (metaData === null) return;
        const moves = (0, $74892fecc95a5cc6$export$f222e06b09a42d9b)[metaData.type];
        const possibleMoves = (0, $1527f3817f23dd44$export$24c7ddd08b7e5376).getPossibleMoveSquares(moves, metaData);
        (0, $7e2e45e7aa06d1d3$export$fb3532a5c6f43e0c).addMoves(possibleMoves);
        (0, $03077d7171343e18$export$a5488e3692cee4f1).displayMoves();
    });
    return true;
};
const $4eba5d2f5338bd41$export$fd451d4c947f02db = {
    addLeftClickEvent: $4eba5d2f5338bd41$var$addLeftClickEvent,
    addRightClickEvent: $4eba5d2f5338bd41$var$addRightClickEvent
};


const $53ffd25df6034fb9$export$f22da7240b7add18 = ()=>{
    try {
        const leftClickSuccess = (0, $4eba5d2f5338bd41$export$fd451d4c947f02db).addLeftClickEvent();
        const rightClickSuccess = (0, $4eba5d2f5338bd41$export$fd451d4c947f02db).addRightClickEvent();
        if (!leftClickSuccess || !rightClickSuccess) return false;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};


const $882b6d93070905b3$var$IS_TM_SCRIPT = document.readyState === "interactive";
const $882b6d93070905b3$var$TIMEOUT_BEFORE_START = 2000;
const $882b6d93070905b3$var$run = ()=>{
    console.log("%c Chess helper starting...", "color: lightblue");
    setTimeout(()=>{
        const success = (0, $53ffd25df6034fb9$export$f22da7240b7add18)();
        if (success) console.log("%c Chess helper initialized!", "color: lightgreen");
        else console.error("%c Failed to initialize application", "color: lightred");
    }, $882b6d93070905b3$var$TIMEOUT_BEFORE_START);
};
if ($882b6d93070905b3$var$IS_TM_SCRIPT) window.onload = ()=>$882b6d93070905b3$var$run();
else $882b6d93070905b3$var$run();


//# sourceMappingURL=index.user.js.map
