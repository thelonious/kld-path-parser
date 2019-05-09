import assert from "assert";
import {uniformGeneratorRange} from "kld-random";
import PathParser from "../lib/PathParser.js";
import SampleHandler from "../lib/SampleHandler.js";

const commands = [
    {name: "A", parameterCount: 7},
    {name: "a", parameterCount: 7},
    {name: "C", parameterCount: 6},
    {name: "c", parameterCount: 6},
    {name: "H", parameterCount: 1},
    {name: "h", parameterCount: 1},
    {name: "L", parameterCount: 2},
    {name: "l", parameterCount: 2},
    {name: "M", parameterCount: 2},
    {name: "m", parameterCount: 2},
    {name: "Q", parameterCount: 4},
    {name: "q", parameterCount: 4},
    {name: "S", parameterCount: 4},
    {name: "s", parameterCount: 4},
    {name: "T", parameterCount: 2},
    {name: "t", parameterCount: 2},
    {name: "V", parameterCount: 1},
    {name: "v", parameterCount: 1},
    {name: "Z", parameterCount: 0},
    {name: "z", parameterCount: 0}
];

/**
 * Make some random parameters
 *
 * @param {function(): number} random
 * @param {number} count
 * @returns {Array<number>}
 */
function makeParameters(random, count) {
    const result = [];

    for (let i = 0; i < count; i++) {
        result.push(Math.round(random() * 1000) / 1000);
    }

    return result;
}

/**
 * Parse path data
 *
 * @param {string} pathData
 * @returns {Array<string>}
 */
function parse(pathData) {
    const parser = new PathParser();
    const handler = new SampleHandler();

    // console.log(pathData);

    parser.setHandler(handler);
    parser.parseData(pathData);

    return handler.logs;
}

/**
 * Parse path data and expect an exception
 *
 * @param {string} pathData
 */
function assertParseException(pathData) {
    try {
        parse(pathData);

        // const logs = parse(pathData);
        // console.log(logs.join("\n"));

        assert(false, `New paths must start with 'm' or 'M': ${pathData}`);
    }
    catch (e) {
        // success
        // console.log(pathData);
        // console.error(e.message);
    }
}

describe("Parser", () => {
    describe("Simple Paths", () => {
        const random = uniformGeneratorRange(-100, 100, 20190508);

        for (const command of commands) {
            if (command.name.match(/[mM]/)) {
                continue;
            }

            const parameters = makeParameters(random, command.parameterCount);
            const pathData = `M10,100 ${command.name}${parameters.join(",")}`;

            it(`Move followed by '${command.name}'`, () => parse(pathData));
        }
    });
    describe("Implied Command Repetition", () => {
        const random = uniformGeneratorRange(-100, 100, 20190507);

        for (const command of commands) {
            const isMoveTo = command.name.match(/[mM]/);
            const parameters = makeParameters(random, command.parameterCount * 2);
            const pathData = isMoveTo
                ? `${command.name}${parameters.join(",")}`
                : `M0,0 ${command.name}${parameters.join(",")}`;

            it(`Repeat '${command.name}'`, () => parse(pathData));
        }
    });
    describe("Invalid Path Starts", () => {
        const random = uniformGeneratorRange(-100, 100, 20190506);

        for (const command of commands) {
            if (command.name.match(/[mM]/)) {
                continue;
            }

            const parameters = makeParameters(random, command.parameterCount);
            const pathData = `${command.name}${parameters.join(",")}`;

            it(`Start with '${command.name}'`, () => assertParseException(pathData));
            it(`Start sub-path with '${command.name}'`, () => assertParseException(`M0,0z ${pathData}`));
        }
    });
    describe("Invalid Parameter Counts", () => {
        const random = uniformGeneratorRange(-100, 100, 20190505);

        for (const command of commands) {
            const isMoveTo = command.name.match(/[mM]/);

            const count = command.parameterCount > 0 ? command.parameterCount - 1 : 1;
            const parameters = makeParameters(random, count);
            const pathData = isMoveTo
                ? `${command.name}${parameters.join(",")}`
                : `M0,0 ${command.name}${parameters.join(",")}`;

            it(`Start with '${command.name}'`, () => assertParseException(pathData));
        }
    });
});
