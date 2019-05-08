import assert from "assert";
import PathLexer from "../lib/PathLexer.js";
import PathLexeme from "../lib/PathLexeme.js";

/**
 * Convert a string to a list of lexemes
 *
 * @param pathData
 * @returns {Array}
 */
function getLexemes(pathData) {
    const lexer = new PathLexer();
    const result = [];

    lexer.setPathData(pathData);

    // loop through all tokens
    let token = lexer.getNextToken();

    while (!token.typeis(3)) {
        result.push(token);

        token = lexer.getNextToken();
    }

    return result;
}

/**
 * Convert path data into a list of lexemes and compare against a given set of lexemes
 *
 * @param {string} pathData
 * @param {Array<PathLexeme>} expectedLexemes
 */
function assertLexemes(pathData, expectedLexemes) {
    const lexemes = getLexemes(pathData);

    assert.strictEqual(expectedLexemes.length, lexemes.length);

    for (let i = 0; i < lexemes.length; i++) {
        const expected = expectedLexemes[i];
        const lexeme = lexemes[i];

        // assert.strictEqual(true, expected.equals(lexeme));
        assert.strictEqual(expected.type, lexeme.type);
        assert.strictEqual(expected.text, lexeme.text);
    }
}

/**
 * Convert command to a lexeme and test the lexemes properties
 *
 * @param {string} command
 */
function assertCommand(command) {
    assertLexemes(
        command,
        [
            new PathLexeme(PathLexeme.COMMAND, command)
        ]
    );
}

/**
 * Convert number to a lexeme and test the lexemes properties
 *
 * @param {string} number
 */
function assertNumber(number) {
    assertLexemes(
        number,
        [
            new PathLexeme(PathLexeme.NUMBER, number)
        ]
    );
}

describe("Lexer", () => {
    describe("Command Lexemes", () => {
        const commands = [
            {name: "Absolute arc", text: "A"},
            {name: "Relative arc", text: "a"},
            {name: "Absolute cubic curveto", text: "C"},
            {name: "Relative cubic curveto", text: "c"},
            {name: "Absolute horizontal lineto", text: "H"},
            {name: "Relative horizontal lineto", text: "h"},
            {name: "Absolute lineto", text: "L"},
            {name: "Relative lineto", text: "l"},
            {name: "Absolute move", text: "M"},
            {name: "Relative move", text: "m"},
            {name: "Absolute quadratic curveto", text: "Q"},
            {name: "Relative quadratic curveto", text: "q"},
            {name: "Absolute smooth cubic curveto", text: "S"},
            {name: "Relative smooth cubic curveto", text: "s"},
            {name: "Absolute smooth quadratic curveto", text: "T"},
            {name: "Relative smooth quadratic curveto", text: "t"},
            {name: "Absolute vertical lineto", text: "V"},
            {name: "Relative vertical lineto", text: "v"},
            {name: "Absolute close", text: "Z"},
            {name: "Relative close", text: "z"}
        ];

        for (const command of commands) {
            it(command.name, () => {
                assertCommand(command.text);
            });
        }
    });
    describe("Number Lexemes", () => {
        const signs = [
            {name: "", text: ""},
            {name: "Negative, ", text: "-"},
            {name: "Positive, ", text: "+"}
        ];
        const numbers = [
            {name: "Zero ", text: "0"},
            {name: "Leading zeros ", text: "000001"},
            {name: "Integer ", text: "1234567890"},
            {name: "Float ", text: "1.2"},
            {name: "Leading decimal point ", text: ".2"},
            {name: "Trailing decimal point ", text: "1."}
        ];

        const exponents = [
            {name: "", text: ""},
            {name: "Lower e", text: "e2"},
            {name: "Upper e", text: "E2"},
            {name: "Lower e, Negative", text: "e-2"},
            {name: "Upper e, Negative", text: "E-2"},
            {name: "Lower e, Positive", text: "e+2"},
            {name: "Upper e, Postiive", text: "E+2"}
        ];

        for (const sign of signs) {
            for (const number of numbers) {
                for (const exponent of exponents) {
                    const label = [
                        sign.name,
                        number.name,
                        exponent.name
                    ].join("").trim();
                    const text = [
                        sign.text,
                        number.text,
                        exponent.text
                    ].join("");

                    // console.log(`[label=${label} text=${text}]`);
                    it(label, () => {
                        assertNumber(text);
                    });
                }
            }
        }
    });
});
