const { TokenDefinition } = require("./token-def");
const { Selector } = require("./selector");

class Group {
    constructor(items) {
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
}

module.exports = {
    Group,
};