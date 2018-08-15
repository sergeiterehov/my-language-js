const { TokenDefinition } = require("./token-def");

class Token {
    constructor(value, def) {
        /**
         * @type {string}
         */
        this.value = value;

        /**
         * @type {TokenDefinition}
         */
        this.def = def;
    }
}

module.exports = {
    Token,
};
