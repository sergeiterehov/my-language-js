"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const TokenDefinition_1 = require("./TokenDefinition");
const Lexer_1 = require("./Lexer");
describe("Lexer", () => {
    it("simple integer parser", () => {
        const $number = new TokenDefinition_1.TokenDefinition(/\-?\d+/);
        const $skip = new TokenDefinition_1.TokenDefinition(/[\s\t\n]+/s);
        const lexer = new Lexer_1.Lexer([$number], $skip);
        const source = "-1 0 1 2 3 4";
        const tokens = lexer.parse(source);
        if (tokens.length !== 6) {
            throw new Error("Should have 6 tokens found");
        }
        if (tokens.map((token) => token.value).join(" ") !== source) {
            throw new Error("Shold be equals to source");
        }
    });
});
