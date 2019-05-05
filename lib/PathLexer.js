/**
 *  PathLexer.js
 *
 *  @copyright 2003, 2013 Kevin Lindsey
 */

"use strict";

const PathLexeme = require("./PathLexeme");

/**
 *  Create a new instance of PathLexer
 *
 *  @param {string} pathData
 */
function PathLexer(pathData) {
    if (pathData === null || pathData === undefined) {
        pathData = "";
    }

    this.setPathData(pathData);
}

/**
 *  setPathData
 *
 *  @param {string} pathData
 */
PathLexer.prototype.setPathData = function(pathData) {
    if (typeof pathData !== "string") {
        throw new Error("PathLexer.setPathData: The first parameter must be a string");
    }

    this._pathData = pathData;
};

/**
 *  getNextToken
 */
PathLexer.prototype.getNextToken = function() {
    let result = null;
    let d = this._pathData;

    while (result === null) {
        if (d === null || d === "") {
            result = new PathLexeme(PathLexeme.EOD, "");
        }
        else if (d.match(/^([ \t\r\n,]+)/)) {
            d = d.substr(RegExp.$1.length);
        }
        // NOTE: Batik seemed to ignore the trailing /i in the following regex,
        // so I expanded the regex to explicitly list both uppercase and
        // lowercase commands.
        else if (d.match(/^([AaCcHhLlMmQqSsTtVvZz])/)) {
            result = new PathLexeme(PathLexeme.COMMAND, RegExp.$1);
            d = d.substr(RegExp.$1.length);
        }
        /* eslint-disable-next-line unicorn/no-unsafe-regex */
        else if (d.match(/^(([-+]?\d+(\.\d*)?|[-+]?\.\d+)([eE][-+]?\d+)?)/)) {
            result = new PathLexeme(PathLexeme.NUMBER, parseFloat(RegExp.$1));
            d = d.substr(RegExp.$1.length);
        }
        else {
            throw new Error("PathLexer.getNextToken: unrecognized path data " + d);
        }
    }

    this._pathData = d;

    return result;
};

if (typeof module !== "undefined") {
    module.exports = PathLexer;
}
