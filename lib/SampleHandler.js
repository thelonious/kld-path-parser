/* eslint-disable prefer-rest-params, no-empty-function */
/**
 *  SampleHandler.js
 *
 *  @copyright 2003, 2013 Kevin Lindsey
 */

"use strict";

/**
 *  SampleHandler
 *
 *  @class
 */
function SampleHandler() {
}

/**
 *  show
 *
 *  @param {string} name
 *  @param {Array<string>} params
 */
SampleHandler.prototype.show = function(name, ...params) {
    console.log(`${name}(${params.join(",")})`);
};

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
SampleHandler.prototype.arcAbs = function(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
    this.show("arcAbs", ...arguments);
};

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
SampleHandler.prototype.arcRel = function(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
    this.show("arcRel", ...arguments);
};

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
SampleHandler.prototype.curvetoCubicAbs = function(x1, y1, x2, y2, x, y) {
    this.show("curvetoCubicAbs", ...arguments);
};

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
SampleHandler.prototype.curvetoCubicRel = function(x1, y1, x2, y2, x, y) {
    this.show("curvetoCubicRel", ...arguments);
};

/**
 *  linetoHorizontalAbs - H
 *
 *  @param {number} x
 */
SampleHandler.prototype.linetoHorizontalAbs = function(x) {
    this.show("linetoHorizontalAbs", ...arguments);
};

/**
 *  linetoHorizontalRel - h
 *
 *  @param {number} x
 */
SampleHandler.prototype.linetoHorizontalRel = function(x) {
    this.show("linetoHorizontalRel", ...arguments);
};

/**
 *  linetoAbs - L
 *
 *  @param {number} x
 *  @param {number} y
 */
SampleHandler.prototype.linetoAbs = function(x, y) {
    this.show("linetoAbs", ...arguments);
};

/**
 *  linetoRel - l
 *
 *  @param {number} x
 *  @param {number} y
 */
SampleHandler.prototype.linetoRel = function(x, y) {
    this.show("linetoRel", ...arguments);
};

/**
 *  movetoAbs - M
 *
 *  @param {number} x
 *  @param {number} y
 */
SampleHandler.prototype.movetoAbs = function(x, y) {
    this.show("movetoAbs", ...arguments);
};

/**
 *  movetoRel - m
 *
 *  @param {number} x
 *  @param {number} y
 */
SampleHandler.prototype.movetoRel = function(x, y) {
    this.show("movetoRel", ...arguments);
};

/**
 *  curvetoQuadraticAbs - Q
 *
 *  @param {number} x1
 *  @param {number} y1
 *  @param {number} x
 *  @param {number} y
 */
SampleHandler.prototype.curvetoQuadraticAbs = function(x1, y1, x, y) {
    this.show("curvetoQuadraticAbs", ...arguments);
};

/**
 *  curvetoQuadraticRel - q
 *
 *  @param {number} x1
 *  @param {number} y1
 *  @param {number} x
 *  @param {number} y
 */
SampleHandler.prototype.curvetoQuadraticRel = function(x1, y1, x, y) {
    this.show("curvetoQuadraticRel", ...arguments);
};

/**
 *  curvetoCubicSmoothAbs - S
 *
 *  @param {number} x2
 *  @param {number} y2
 *  @param {number} x
 *  @param {number} y
 */
SampleHandler.prototype.curvetoCubicSmoothAbs = function(x2, y2, x, y) {
    this.show("curvetoCubicSmoothAbs", ...arguments);
};

/**
 *  curvetoCubicSmoothRel - s
 *
 *  @param {number} x2
 *  @param {number} y2
 *  @param {number} x
 *  @param {number} y
 */
SampleHandler.prototype.curvetoCubicSmoothRel = function(x2, y2, x, y) {
    this.show("curvetoCubicSmoothRel", ...arguments);
};

/**
 *  curvetoQuadraticSmoothAbs - T
 *
 *  @param {number} x
 *  @param {number} y
 */
SampleHandler.prototype.curvetoQuadraticSmoothAbs = function(x, y) {
    this.show("curvetoQuadraticSmoothAbs", ...arguments);
};

/**
 *  curvetoQuadraticSmoothRel - t
 *
 *  @param {number} x
 *  @param {number} y
 */
SampleHandler.prototype.curvetoQuadraticSmoothRel = function(x, y) {
    this.show("curvetoQuadraticSmoothRel", ...arguments);
};

/**
 *  linetoVerticalAbs - V
 *
 *  @param {number} y
 */
SampleHandler.prototype.linetoVerticalAbs = function(y) {
    this.show("linetoVerticalAbs", ...arguments);
};

/**
 *  linetoVerticalRel - v
 *
 *  @param {number} y
 */
SampleHandler.prototype.linetoVerticalRel = function(y) {
    this.show("linetoVerticalRel", ...arguments);
};

/**
 *  closePath - z or Z
 */
SampleHandler.prototype.closePath = function() {
    this.show("closePath", ...arguments);
};

if (typeof module !== "undefined") {
    module.exports = SampleHandler;
}
