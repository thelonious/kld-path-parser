var PathParser = require('../lib/PathParser');
var SampleHandler = require('../lib/SampleHandler');

exports.parse = function(beforeExit, assert) {
    var parser = new PathParser();
    var pathData = "M40,70 Q50,150 90,90 T135,130 L160,70 C180,180 280,55 280,140 S400,110 290,100";

    parser.setHandler(new SampleHandler());
    parser.parseData(pathData);
};
