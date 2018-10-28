"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../lexer/Token");
const GroupDefinition_1 = require("./GroupDefinition");
class Group {
    constructor(definition, structure) {
        this.definition = definition;
        this.structure = structure;
        this.tokens = structure.filter((item) => item instanceof Token_1.Token);
        this.children = structure.filter((item) => item instanceof Group);
    }
    get value() {
        return this.structure.reduce((list, item) => [
            ...list,
            ...(item instanceof Token_1.Token ? [item] : item.getTokens()),
        ], []).map((token) => token.value).join("");
    }
    get type() {
        return this.definition;
    }
    is(definition) {
        return this.definition === definition;
    }
    has(definition) {
        if (definition instanceof GroupDefinition_1.GroupDefinition) {
            return !!this.children.find((group) => group.is(definition));
        }
        else {
            return !!this.tokens.find((token) => definition === token.definition);
        }
    }
    all(definition) {
        return this.children.filter((group) => group.is(definition));
    }
    get(definition) {
        const result = this.children.find((group) => group.is(definition));
        if (!result) {
            throw new Error("Group not found by definition");
        }
        return result;
    }
    getTokens() {
        return [...this.tokens];
    }
    getChildren() {
        return [...this.children];
    }
    stringify(separator = " ", level = 0) {
        return this.structure.map((item) => {
            if (item instanceof Token_1.Token) {
                return item.value;
            }
            else {
                return item.stringify(separator, level);
            }
        }).join(separator);
    }
}
exports.Group = Group;
