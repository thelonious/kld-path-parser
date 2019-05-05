/**
 *  PathLexeme.js
 *
 *  @copyright 2002, 2013 Kevin Lindsey
 */

"use strict";

/*
 * token type enumerations
 */
PathLexeme.UNDEFINED = 0;
PathLexeme.COMMAND = 1;
PathLexeme.NUMBER = 2;
PathLexeme.EOD = 3;

/**
 *  Create a new instance of PathLexeme
 *
 *  @class
 *  @param {number} type
 *  @param {string} text
 */
function PathLexeme(type, text) {
    this.init(type, text);
}

/**
 *  init
 *
 *  @param {number} type
 *  @param {string} text
 */
PathLexeme.prototype.init = function(type, text) {
    this.type = type;
    this.text = text;
};

/**
 *  typeis
 *
 *  @param {number} type
 *  @returns {boolean}
 */
PathLexeme.prototype.typeis = function(type) {
    return this.type === type;
};

if (typeof module !== "undefined") {
    module.exports = PathLexeme;
}
