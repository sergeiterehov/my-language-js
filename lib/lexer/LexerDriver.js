"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
class LexerDriver {
    constructor(definitions, source) {
        this.definitions = definitions;
        this.source = source;
    }
    parse() {
        let source = this.source;
        const tokens = [];
        while (source.length > 0) {
            const found = [];
            for (const definition of this.definitions) {
                const fragment = definition.find(source);
                if (fragment) {
                    found.push(new Token_1.Token(definition, fragment));
                }
            }
            if (found.length === 0) {
                throw new Error(`Unknown lexem: ${source.substr(0, 30)}...`);
            }
            const token = found.sort((a, b) => b.value.length - a.value.length)[0];
            tokens.push(token);
            source = source.substring(token.value.length);
        }
        return tokens;
    }
}
exports.LexerDriver = LexerDriver;
