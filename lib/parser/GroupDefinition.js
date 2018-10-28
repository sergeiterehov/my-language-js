"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Group_1 = require("./Group");
class GroupDefinition {
    constructor(rule) {
        this.closure = true;
        this.lockGetTokenDefinitions = false;
        this.rule = rule;
    }
    find(stream) {
        const found = this.getRule().find(stream);
        /**
         * Array<Token | Group> | void
         *
         * If we have found set, then create Group.
         * Group can be created here only!
         */
        if (!found) {
            return undefined;
        }
        return new Group_1.Group(this, found);
    }
    getTokenDefinitions() {
        if (this.lockGetTokenDefinitions) {
            return [];
        }
        this.lockGetTokenDefinitions = true;
        const result = this.getRule().getTokenDefinitions();
        this.lockGetTokenDefinitions = false;
        return result.reduce((list, item) => list.indexOf(item) !== -1 ? list : [...list, item], []);
    }
    getRule() {
        if (this.closure) {
            if (this.rule instanceof Function) {
                this.rule = this.rule();
            }
            this.closure = false;
        }
        return this.rule;
    }
}
exports.GroupDefinition = GroupDefinition;
