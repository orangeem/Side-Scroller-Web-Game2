﻿module constants {
    // State Machine Constants
    export var MENU_STATE: number = 0;
    export var PLAY_STATE: number = 1;
    export var PLAY_STATE_LEVEL_2: number = 5;
    export var PLAY_STATE_LEVEL_3: number = 6;
    export var GAME_OVER_STATE: number = 2;
    export var INSTRUCTIONS_STATE: number = 4;
    export var WINNING_STATE: number = 7;

    // Game Constants
    export var LABEL_FONT = "40px Copperplate Gothic Light";
    export var SUBLABEL_FONT = "20px Copperplate Gothic Light";
    export var LABEL_COLOUR = "#FFFF00";
    export var ALLIEN_LIVES = 3;
    export var ALLIEN_HP = 100;
    export var BULLET_FLAG: boolean = false;
    export var BULLET_Y: number;
    export var BULLET_X: number;
}  