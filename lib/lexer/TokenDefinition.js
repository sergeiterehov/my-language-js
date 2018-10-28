"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenDefinition {
    constructor(rule) {
        this.rule = rule;
    }
    find(source) {
        const found = this.rule.exec(source);
        if (!found || found.index > 0) {
            return undefined;
        }
        return source.substr(0, found[0].length);
    }
}
exports.TokenDefinition = TokenDefinition;
