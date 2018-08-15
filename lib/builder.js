const { Tokenizer } = require("./tokenizer");
const { Parser } = require("./parser");
const { Rule } = require("./rule");
const { TokenDefinition } = require("./token-def");

class Builder {
    /**
     * 
     * @param {Rule[]} rules 
     * @param {TokenDefinition} skip 
     */
    constructor(rules, skip) {
        this.rules = rules;
        this.skip = skip;
    }

    build(src) {
        let tokenDefinitions = [];

        this.rules.map((rule) => rule.group.getTokenDefinitions().map((def) => {

            if (-1 === tokenDefinitions.indexOf(def)) {
                tokenDefinitions.push(def);
            }
        }));

        const tokenizer = new Tokenizer(src, tokenDefinitions, this.skip);

        const tokens = tokenizer.tokens();

        const parser = new Parser(tokens, this.rules);

        const forest = parser.parse();

        console.log(forest);
    }
}

const createBuilder = (rules, skip) => new Builder(rules, skip);

module.exports = {
    createBuilder,
    Builder,
};
