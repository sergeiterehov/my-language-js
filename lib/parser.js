const { Token } = require("./token");
const { Rule } = require("./rule");

class Parser {
    constructor(tokens, rules) {
        /**
         * @type {Token[]}
         */
        this.tokens = tokens;

        /**
         * @type {Rule[]}
         */
        this.rules = rules;
    }

    parse() {
        console.log(this.rules[0].group);
    }
}

module.exports = {
    Parser,
};
