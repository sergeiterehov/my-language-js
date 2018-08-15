const { TokenDefinition } = require("./token-def");
const { Token } = require("./token");

class Tokenizer {
    constructor(src, tokenDefinitions, skip) {
        /**
         * @type {string}
         */
        this.src = src;

        /**
         * @type {TokenDefinition[]}
         */
        this.defs = tokenDefinitions;

        /**
         * @type {TokenDefinition}
         */
        this.skip = skip;
    }

    tokens() {
        const tokens = [];

        while (true) {
            this.skipEmpty();

            let length = -1;

            const found = this.defs.find((def) => {
                length = def.find(this.src);

                return length >= 0;
            });

            if (length === -1) {
                break;
            }

            const value = this.src.substr(0, length);

            this.src = this.src.substr(length);

            tokens.push(new Token(value, found));
        }

        return tokens;
    }

    skipEmpty() {
        let length = this.skip.find(this.src);

        if (length === -1) {
            return;
        }

        this.src = this.src.substr(length);
    }
}

module.exports = {
    Tokenizer,
};
