"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const TokenDefinition_1 = require("../lexer/TokenDefinition");
const GroupDefinition_1 = require("./GroupDefinition");
const Rule_1 = require("./Rule");
const Lexer_1 = require("../lexer/Lexer");
const TokenStream_1 = require("../lexer/TokenStream");
describe("Parser", () => {
    it("simple integer parser", () => {
        const $number = new TokenDefinition_1.TokenDefinition(/\d+/);
        const $plus = new TokenDefinition_1.TokenDefinition(/\+/);
        const $minus = new TokenDefinition_1.TokenDefinition(/\-/);
        const $skip = new TokenDefinition_1.TokenDefinition(/[\s\t\n]+/s);
        const $$sign = new GroupDefinition_1.GroupDefinition(new Rule_1.Rule(Rule_1.RuleOperation.Or, [$plus, $minus]));
        const $$number = new GroupDefinition_1.GroupDefinition(new Rule_1.Rule(Rule_1.RuleOperation.And, [
            new Rule_1.Rule(Rule_1.RuleOperation.Maybe, [$$sign]),
            $number,
        ]));
        const $$line = new GroupDefinition_1.GroupDefinition(new Rule_1.Rule(Rule_1.RuleOperation.Any, [$$number]));
        const lexer = new Lexer_1.Lexer($$line.getTokenDefinitions(), $skip);
        const source = "-1 2 3";
        const tokens = lexer.parse(source);
        const stream = new TokenStream_1.TokenStream(tokens);
        const found = $$line.find(stream);
        if (!found) {
            throw new Error("Should return some result");
        }
        if (found.all($$number).map((item) => item.value).join(" ") !== source) {
            throw new Error("Should be equal to source");
        }
    });
});
