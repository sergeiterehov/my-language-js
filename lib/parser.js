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
        const tokens = [...this.tokens];

        const node = this.rules[0].find(tokens);

        console.log(node);
    }
}

module.exports = {
    Parser,
};
