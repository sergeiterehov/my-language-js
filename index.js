const { defineToken } = require("./lib/token-def");
const { createSequence } = require("./lib/and");
const { createSelector } = require("./lib/or");
const { createBuilder } = require("./lib/builder");
const { createRule } = require("./lib/rule");

module.exports.$tokens = defineToken;
module.exports.$and = createSequence;
module.exports.$or = createSelector;
module.exports.$builder = createBuilder;
module.exports.$build = createRule;

module.exports.$extract = (number, func) => (...args) => func(args[number - 1]);
