const { Selector } = require("./selector");

class TokenDefinition {
    constructor(regs) {
        this.regs = regs;
    }

    /**
     * @param {string} value 
     * @returns {Selector}
     */
    sel(value) {
        return new Selector(this, value);
    }

    /**
     * @param {string} src 
     */
    find(src) {
        let length = -1;

        this.regs.find((reg) => {
            const found = reg.exec(src);

            if (! found || found.index > 0) {
                return false;
            }

            length = found[0].length;

            return true;
        });

        return length;
    }

    /**
     * @param {Token[]} tokens 
     * @param {number} start 
     * 
     * @returns {TokenNode|undefined}
     */
    test(tokens, start) {
        //
    }
}

/**
 * Extract all RegExps from received items.
 *
 * @param {Array<TokenDefinition|RegExp>} items 
 */
const extractRegs = (items) => {
    const regs = [];

    items.forEach((item) => {
        if (item instanceof Function) {
            item = item();
        }

        if (item instanceof RegExp) {
            regs.push(item);
        } else if (item instanceof TokenDefinition) {
            regs.push(...item.regs);
        } else {
            throw new Error("Unknown type of token definition");
        }
    });

    return regs;
};

const defineToken = (...items) => new TokenDefinition(extractRegs(items));

module.exports = {
    defineToken,
    TokenDefinition,
};