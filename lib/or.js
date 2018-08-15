const { Group } = require("./group");

class OneOf extends Group {
    //
}

const createSelector = (...items) => new OneOf(items);

module.exports = {
    createSelector,
    OneOf,
};
