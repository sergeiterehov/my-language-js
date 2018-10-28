"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GroupDefinition_1 = require("./GroupDefinition");
const Rule_1 = require("./Rule");
const TokenStream_1 = require("../lexer/TokenStream");
const Lexer_1 = require("../lexer/Lexer");
class Parser {
    constructor(definitions, skip) {
        this.root = new GroupDefinition_1.GroupDefinition(new Rule_1.Rule(Rule_1.RuleOperation.Any, definitions));
        this.lexer = new Lexer_1.Lexer(this.root.getTokenDefinitions(), skip);
    }
    parse(source) {
        const tokens = this.lexer.parse(source);
        const stream = new TokenStream_1.TokenStream(tokens);
        const group = this.root.find(stream);
        if (!group) {
            throw new Error("Absolutely nothing found");
        }
        return group;
    }
}
exports.Parser = Parser;
