const { Group } = require("./group");

class Rule {
    /**
     * @param {Group} group 
     * @param {(...any) => any} transform 
     */
    constructor(group, transform) {
        /**
         * @type {Group}
         */
        this.group = group;

        /**
         * @type {(...any) => any}
         */
        this.transform = transform;
    }
}

const createRule = (group, transform) => {
    // Late binding
    if (group instanceof Function) {
        group = group();
    } 
    
    if (group instanceof Group) {
        group.lateBind();
    } else {
        throw new Error("Undefined type of group");
    }

    return new Rule(group, transform);
};

module.exports = {
    createRule,
    Rule,
};
