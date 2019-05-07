(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.KldPathParser = {}));
}(this, function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   *  PathLexeme.js
   *
   *  @copyright 2002, 2013 Kevin Lindsey
   *  @module PathLexeme
   */

  /**
   *  PathLexeme
   */
  var PathLexeme =
  /*#__PURE__*/
  function () {
    /**
     *  @param {number} type
     *  @param {string} text
     */
    function PathLexeme(type, text) {
      _classCallCheck(this, PathLexeme);

      this.type = type;
      this.text = text;
    }
    /**
     *  typeis
     *
     *  @param {number} type
     *  @returns {boolean}
     */


    _createClass(PathLexeme, [{
      key: "typeis",
      value: function typeis(type) {
        return this.type === type;
      }
    }]);

    return PathLexeme;
  }();
  /*
   * token type enumerations
   */


  PathLexeme.UNDEFINED = 0;
  PathLexeme.COMMAND = 1;
  PathLexeme.NUMBER = 2;
  PathLexeme.EOD = 3;

  /**
   *  Create a new instance of PathLexer
   */

  var PathLexer =
  /*#__PURE__*/
  function () {
    /**
     *  @param {string} pathData
     */
    function PathLexer(pathData) {
      _classCallCheck(this, PathLexer);

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


    _createClass(PathLexer, [{
      key: "setPathData",
      value: function setPathData(pathData) {
        if (typeof pathData !== "string") {
          throw new Error("PathLexer.setPathData: The first parameter must be a string");
        }

        this._pathData = pathData;
      }
      /**
       *  getNextToken
       */

    }, {
      key: "getNextToken",
      value: function getNextToken() {
        var result = null;
        var d = this._pathData;

        while (result === null) {
          if (d === null || d === "") {
            result = new PathLexeme(PathLexeme.EOD, "");
          } else if (d.match(/^([ \t\r\n,]+)/)) {
            d = d.substr(RegExp.$1.length);
          } // NOTE: Batik seemed to ignore the trailing /i in the following regex,
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
              } else {
                throw new Error("PathLexer.getNextToken: unrecognized path data " + d);
              }
        }

        this._pathData = d;
        return result;
      }
    }]);

    return PathLexer;
  }();

  /**
   *  PathParser
   */

  var PathParser =
  /*#__PURE__*/
  function () {
    /**
     * constructor
     */
    function PathParser() {
      _classCallCheck(this, PathParser);

      this._lexer = new PathLexer();
      this._handler = null;
    }
    /**
     *  parseData
     *
     *  @param {string} pathData
     *  @throws {Error}
     */


    _createClass(PathParser, [{
      key: "parseData",
      value: function parseData(pathData) {
        if (typeof pathData !== "string") {
          throw new Error("PathParser.parseData: The first parameter must be a string");
        } // begin parse


        if (this._handler !== null && typeof this._handler.beginParse === "function") {
          this._handler.beginParse();
        } // pass the pathData to the lexer


        var lexer = this._lexer;
        lexer.setPathData(pathData); // set mode to signify new path
        // NOTE: BOP means Beginning of Path

        var mode = "BOP"; // Process all tokens

        var token = lexer.getNextToken();

        while (token.typeis(PathLexeme.EOD) === false) {
          var parameterCount = void 0;
          var params = []; // process current token

          switch (token.type) {
            case PathLexeme.COMMAND:
              if (mode === "BOP" && token.text !== "M" && token.text !== "m") {
                throw new Error("PathParser.parseData: a path must begin with a moveto command");
              } // Set new parsing mode


              mode = token.text; // Get count of numbers that must follow this command

              parameterCount = PathParser.PARAMCOUNT[token.text.toUpperCase()]; // Advance past command token

              token = lexer.getNextToken();
              break;

            case PathLexeme.NUMBER:
              // Most commands allow you to keep repeating parameters
              // without specifying the command again.  We just assume
              // that is the case and do nothing since the mode remains
              // the same and param_count is already set
              break;

            default:
              throw new Error("PathParser.parseData: unrecognized token type: " + token.type);
          } // Get parameters


          for (var i = 0; i < parameterCount; i++) {
            switch (token.type) {
              case PathLexeme.COMMAND:
                throw new Error("PathParser.parseData: parameter must be a number: " + token.text);

              case PathLexeme.NUMBER:
                // convert current parameter to a float and add to
                // parameter list
                params[i] = parseFloat(token.text);
                break;

              default:
                throw new Error("PathParser.parseData: unrecognized token type: " + token.type);
            }

            token = lexer.getNextToken();
          } // fire handler


          if (this._handler !== null) {
            var handler = this._handler;
            var methodName = PathParser.METHODNAME[mode];

            if (handler !== null && typeof handler[methodName] === "function") {
              handler[methodName].apply(handler, params);
            }
          } // Lineto's follow moveto when no command follows moveto params.  Go
          // ahead and set the mode just in case no command follows the moveto
          // command


          switch (mode) {
            case "M":
              mode = "L";
              break;

            case "m":
              mode = "l";
              break;

            default: // ignore for now

          }
        } // end parse


        if (this._handler !== null && typeof this._handler.endParse === "function") {
          this._handler.endParse();
        }
      }
      /**
       *  setHandler
       *
       *  @param {Object} handler
       */

    }, {
      key: "setHandler",
      value: function setHandler(handler) {
        this._handler = handler;
      }
    }]);

    return PathParser;
  }();
  /*
   * class constants
   */


  PathParser.PARAMCOUNT = {
    A: 7,
    C: 6,
    H: 1,
    L: 2,
    M: 2,
    Q: 4,
    S: 4,
    T: 2,
    V: 1,
    Z: 0
  };
  PathParser.METHODNAME = {
    A: "arcAbs",
    a: "arcRel",
    C: "curvetoCubicAbs",
    c: "curvetoCubicRel",
    H: "linetoHorizontalAbs",
    h: "linetoHorizontalRel",
    L: "linetoAbs",
    l: "linetoRel",
    M: "movetoAbs",
    m: "movetoRel",
    Q: "curvetoQuadraticAbs",
    q: "curvetoQuadraticRel",
    S: "curvetoCubicSmoothAbs",
    s: "curvetoCubicSmoothRel",
    T: "curvetoQuadraticSmoothAbs",
    t: "curvetoQuadraticSmoothRel",
    V: "linetoVerticalAbs",
    v: "linetoVerticalRel",
    Z: "closePath",
    z: "closePath"
  };

  /* eslint-disable prefer-rest-params, class-methods-use-this */

  /**
   *  SampleHandler.js
   *
   *  @copyright 2003, 2013 Kevin Lindsey
   *  @module SampleHandler
   */

  /**
   *  show
   *
   *  @param {string} name
   *  @param {Array<string>} params
   */
  function show(name) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    console.log("".concat(name, "(").concat(params.join(","), ")"));
  }
  /**
   *  SampleHandler
   */


  var SampleHandler =
  /*#__PURE__*/
  function () {
    function SampleHandler() {
      _classCallCheck(this, SampleHandler);
    }

    _createClass(SampleHandler, [{
      key: "arcAbs",

      /**
       *  arcAbs - A
       *
       *  @param {number} rx
       *  @param {number} ry
       *  @param {number} xAxisRotation
       *  @param {boolean} largeArcFlag
       *  @param {boolean} sweepFlag
       *  @param {number} x
       *  @param {number} y
       */
      value: function arcAbs(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        show.apply(void 0, ["arcAbs"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  arcRel - a
       *
       *  @param {number} rx
       *  @param {number} ry
       *  @param {number} xAxisRotation
       *  @param {boolean} largeArcFlag
       *  @param {boolean} sweepFlag
       *  @param {number} x
       *  @param {number} y
       */

    }, {
      key: "arcRel",
      value: function arcRel(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        show.apply(void 0, ["arcRel"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  curvetoCubicAbs - C
       *
       *  @param {number} x1
       *  @param {number} y1
       *  @param {number} x2
       *  @param {number} y2
       *  @param {number} x
       *  @param {number} y
       */

    }, {
      key: "curvetoCubicAbs",
      value: function curvetoCubicAbs(x1, y1, x2, y2, x, y) {
        show.apply(void 0, ["curvetoCubicAbs"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  curvetoCubicRel - c
       *
       *  @param {number} x1
       *  @param {number} y1
       *  @param {number} x2
       *  @param {number} y2
       *  @param {number} x
       *  @param {number} y
       */

    }, {
      key: "curvetoCubicRel",
      value: function curvetoCubicRel(x1, y1, x2, y2, x, y) {
        show.apply(void 0, ["curvetoCubicRel"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  linetoHorizontalAbs - H
       *
       *  @param {number} x
       */

    }, {
      key: "linetoHorizontalAbs",
      value: function linetoHorizontalAbs(x) {
        show.apply(void 0, ["linetoHorizontalAbs"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  linetoHorizontalRel - h
       *
       *  @param {number} x
       */

    }, {
      key: "linetoHorizontalRel",
      value: function linetoHorizontalRel(x) {
        show.apply(void 0, ["linetoHorizontalRel"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  linetoAbs - L
       *
       *  @param {number} x
       *  @param {number} y
       */

    }, {
      key: "linetoAbs",
      value: function linetoAbs(x, y) {
        show.apply(void 0, ["linetoAbs"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  linetoRel - l
       *
       *  @param {number} x
       *  @param {number} y
       */

    }, {
      key: "linetoRel",
      value: function linetoRel(x, y) {
        show.apply(void 0, ["linetoRel"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  movetoAbs - M
       *
       *  @param {number} x
       *  @param {number} y
       */

    }, {
      key: "movetoAbs",
      value: function movetoAbs(x, y) {
        show.apply(void 0, ["movetoAbs"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  movetoRel - m
       *
       *  @param {number} x
       *  @param {number} y
       */

    }, {
      key: "movetoRel",
      value: function movetoRel(x, y) {
        show.apply(void 0, ["movetoRel"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  curvetoQuadraticAbs - Q
       *
       *  @param {number} x1
       *  @param {number} y1
       *  @param {number} x
       *  @param {number} y
       */

    }, {
      key: "curvetoQuadraticAbs",
      value: function curvetoQuadraticAbs(x1, y1, x, y) {
        show.apply(void 0, ["curvetoQuadraticAbs"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  curvetoQuadraticRel - q
       *
       *  @param {number} x1
       *  @param {number} y1
       *  @param {number} x
       *  @param {number} y
       */

    }, {
      key: "curvetoQuadraticRel",
      value: function curvetoQuadraticRel(x1, y1, x, y) {
        show.apply(void 0, ["curvetoQuadraticRel"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  curvetoCubicSmoothAbs - S
       *
       *  @param {number} x2
       *  @param {number} y2
       *  @param {number} x
       *  @param {number} y
       */

    }, {
      key: "curvetoCubicSmoothAbs",
      value: function curvetoCubicSmoothAbs(x2, y2, x, y) {
        show.apply(void 0, ["curvetoCubicSmoothAbs"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  curvetoCubicSmoothRel - s
       *
       *  @param {number} x2
       *  @param {number} y2
       *  @param {number} x
       *  @param {number} y
       */

    }, {
      key: "curvetoCubicSmoothRel",
      value: function curvetoCubicSmoothRel(x2, y2, x, y) {
        show.apply(void 0, ["curvetoCubicSmoothRel"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  curvetoQuadraticSmoothAbs - T
       *
       *  @param {number} x
       *  @param {number} y
       */

    }, {
      key: "curvetoQuadraticSmoothAbs",
      value: function curvetoQuadraticSmoothAbs(x, y) {
        show.apply(void 0, ["curvetoQuadraticSmoothAbs"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  curvetoQuadraticSmoothRel - t
       *
       *  @param {number} x
       *  @param {number} y
       */

    }, {
      key: "curvetoQuadraticSmoothRel",
      value: function curvetoQuadraticSmoothRel(x, y) {
        show.apply(void 0, ["curvetoQuadraticSmoothRel"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  linetoVerticalAbs - V
       *
       *  @param {number} y
       */

    }, {
      key: "linetoVerticalAbs",
      value: function linetoVerticalAbs(y) {
        show.apply(void 0, ["linetoVerticalAbs"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  linetoVerticalRel - v
       *
       *  @param {number} y
       */

    }, {
      key: "linetoVerticalRel",
      value: function linetoVerticalRel(y) {
        show.apply(void 0, ["linetoVerticalRel"].concat(Array.prototype.slice.call(arguments)));
      }
      /**
       *  closePath - z or Z
       */

    }, {
      key: "closePath",
      value: function closePath() {
        show.apply(void 0, ["closePath"].concat(Array.prototype.slice.call(arguments)));
      }
    }]);

    return SampleHandler;
  }();

  /**
   *  @module kld-path-parser
   */

  exports.PathLexer = PathLexer;
  exports.PathParser = PathParser;
  exports.SampleHandler = SampleHandler;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
