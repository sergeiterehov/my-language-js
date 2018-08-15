const { Group } = require("./group");

class Sequence extends Group {
    //
}

const createSequence = (...items) => new Sequence(items);

module.exports = {
    createSequence,
    Sequence,
};
