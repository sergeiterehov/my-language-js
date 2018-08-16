const { TokenDefinition } = require("./token-def");
const { TokenNode } = require("./token-node");
const { Token } = require("./token");
const { Selector } = require("./selector");

class Group {
    constructor(items) {
        /**
         * @type {(Selector|Group|TokenDefinition)[]}
         */
        this.items = items;
    }

    lateBind() {
        if (this.lateBindLock) {
            return;
        }

        this.lateBindLock = true;

        this.items = this.items.map((item) => {
            if (item instanceof Function) {
                item = item();
            }

            if (item instanceof Group) {
                item.lateBind();
            }

            return item;
        });

        delete this.lateBindLock;
    }

    /**
     * @returns {TokenDefinition[]}
     */
    getTokenDefinitions() {
        if (this.tokenDefinitionsLock) {
            return [];
        }

        this.tokenDefinitionsLock = true;
        
        const defs = [];

        this.items.forEach((item) => {
            if (item instanceof Group) {
                defs.push(...item.getTokenDefinitions());
            } else if (item instanceof Selector) {
                defs.push(item.def);
            } else if (item instanceof TokenDefinition) {
                defs.push(item);
            } else {
                throw new Error("Undefined token group type");
            }
        });

        delete this.tokenDefinitionsLock;

        return defs;
    }

    test(tokens, start) {
        throw new Error("Method test is not allowed");
    }

    /**
     * @param {Token[]} tokens 
     * @param {number} start
     * 
     * @returns {TokenNode|undefined}
     */
    find(tokens, start) {
        const found = this.items.map((item) => {
            if (item instanceof Selector) {
                return item.test(tokens, start);
            } else if (item instanceof Group) {
                return item.test(tokens, start);
            } else if (item instanceof TokenDefinition) {
                return item.test(tokens, start);
            } else {
                throw new Error("Undefined type of item on the test");
            }
        });
    }
}

module.exports = {
    Group,
};