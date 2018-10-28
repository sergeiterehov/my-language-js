"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LexerDriver_1 = require("./LexerDriver");
class Lexer {
    constructor(definitions, skip) {
        this.definitions = [...definitions, skip];
        this.skip = skip;
    }
    parse(source) {
        const driver = new LexerDriver_1.LexerDriver(this.definitions, source);
        const tokens = driver.parse().filter((token) => token.definition !== this.skip);
        return tokens;
    }
}
exports.Lexer = Lexer;
