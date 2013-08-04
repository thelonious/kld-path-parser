var PathLexer = require('../lib/PathLexer');

exports.lex = function(beforeExit, assert) {
    var lexer = new PathLexer();
    var pathData = "M50,120 Q100,20 150,120 L250,120 C300,20 350,120 400,20";

    lexer.setPathData(pathData);

    token = lexer.getNextToken();

    while ( !token.typeis(3) ) {
        console.log(token.type + ":" + token.text);

        token = lexer.getNextToken();
    }
};
