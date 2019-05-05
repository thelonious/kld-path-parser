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
function show(name, ...params) {
    console.log(`${name}(${params.join(",")})`);
}

/**
 *  SampleHandler
 */
class SampleHandler {
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
    arcAbs(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        show("arcAbs", ...arguments);
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
    arcRel(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
        show("arcRel", ...arguments);
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
    curvetoCubicAbs(x1, y1, x2, y2, x, y) {
        show("curvetoCubicAbs", ...arguments);
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
    curvetoCubicRel(x1, y1, x2, y2, x, y) {
        show("curvetoCubicRel", ...arguments);
    }

    /**
     *  linetoHorizontalAbs - H
     *
     *  @param {number} x
     */
    linetoHorizontalAbs(x) {
        show("linetoHorizontalAbs", ...arguments);
    }

    /**
     *  linetoHorizontalRel - h
     *
     *  @param {number} x
     */
    linetoHorizontalRel(x) {
        show("linetoHorizontalRel", ...arguments);
    }

    /**
     *  linetoAbs - L
     *
     *  @param {number} x
     *  @param {number} y
     */
    linetoAbs(x, y) {
        show("linetoAbs", ...arguments);
    }

    /**
     *  linetoRel - l
     *
     *  @param {number} x
     *  @param {number} y
     */
    linetoRel(x, y) {
        show("linetoRel", ...arguments);
    }

    /**
     *  movetoAbs - M
     *
     *  @param {number} x
     *  @param {number} y
     */
    movetoAbs(x, y) {
        show("movetoAbs", ...arguments);
    }

    /**
     *  movetoRel - m
     *
     *  @param {number} x
     *  @param {number} y
     */
    movetoRel(x, y) {
        show("movetoRel", ...arguments);
    }

    /**
     *  curvetoQuadraticAbs - Q
     *
     *  @param {number} x1
     *  @param {number} y1
     *  @param {number} x
     *  @param {number} y
     */
    curvetoQuadraticAbs(x1, y1, x, y) {
        show("curvetoQuadraticAbs", ...arguments);
    }

    /**
     *  curvetoQuadraticRel - q
     *
     *  @param {number} x1
     *  @param {number} y1
     *  @param {number} x
     *  @param {number} y
     */
    curvetoQuadraticRel(x1, y1, x, y) {
        show("curvetoQuadraticRel", ...arguments);
    }

    /**
     *  curvetoCubicSmoothAbs - S
     *
     *  @param {number} x2
     *  @param {number} y2
     *  @param {number} x
     *  @param {number} y
     */
    curvetoCubicSmoothAbs(x2, y2, x, y) {
        show("curvetoCubicSmoothAbs", ...arguments);
    }

    /**
     *  curvetoCubicSmoothRel - s
     *
     *  @param {number} x2
     *  @param {number} y2
     *  @param {number} x
     *  @param {number} y
     */
    curvetoCubicSmoothRel(x2, y2, x, y) {
        show("curvetoCubicSmoothRel", ...arguments);
    }

    /**
     *  curvetoQuadraticSmoothAbs - T
     *
     *  @param {number} x
     *  @param {number} y
     */
    curvetoQuadraticSmoothAbs(x, y) {
        show("curvetoQuadraticSmoothAbs", ...arguments);
    }

    /**
     *  curvetoQuadraticSmoothRel - t
     *
     *  @param {number} x
     *  @param {number} y
     */
    curvetoQuadraticSmoothRel(x, y) {
        show("curvetoQuadraticSmoothRel", ...arguments);
    }

    /**
     *  linetoVerticalAbs - V
     *
     *  @param {number} y
     */
    linetoVerticalAbs(y) {
        show("linetoVerticalAbs", ...arguments);
    }

    /**
     *  linetoVerticalRel - v
     *
     *  @param {number} y
     */
    linetoVerticalRel(y) {
        show("linetoVerticalRel", ...arguments);
    }

    /**
     *  closePath - z or Z
     */
    closePath() {
        show("closePath", ...arguments);
    }
}

export default SampleHandler;
