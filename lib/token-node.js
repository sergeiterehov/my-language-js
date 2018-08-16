class TokenNode {
    constructor (value) {
        /**
         * @type {TokenNode[]}
         */
        this.children = [];

        /**
         * @type {string}
         */
        this.value = value;
    }
}

module.exports = {
    TokenNode,
};
