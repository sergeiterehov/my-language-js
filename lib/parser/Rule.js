"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenDefinition_1 = require("../lexer/TokenDefinition");
const RuleDriver_1 = require("./RuleDriver");
var RuleOperation;
(function (RuleOperation) {
    RuleOperation["And"] = "AND";
    RuleOperation["Or"] = "OR";
    RuleOperation["Any"] = "ANY";
    RuleOperation["Maybe"] = "MAYBE";
})(RuleOperation = exports.RuleOperation || (exports.RuleOperation = {}));
class Rule {
    constructor(operation, predicates) {
        this.closure = true;
        this.lockGetTokenDefinitions = false;
        this.operation = operation;
        this.predicates = predicates;
    }
    getTokenDefinitions() {
        if (this.lockGetTokenDefinitions) {
            return [];
        }
        this.lockGetTokenDefinitions = true;
        const result = this.getPredicates().reduce((list, item) => [
            ...list,
            ...(item instanceof TokenDefinition_1.TokenDefinition ? [item] : item.getTokenDefinitions()),
        ], []);
        this.lockGetTokenDefinitions = false;
        return result;
    }
    find(stream) {
        const driver = new RuleDriver_1.RuleDriver(this.operation, this.getPredicates(), stream);
        return driver.find();
    }
    getPredicates() {
        if (this.closure) {
            this.predicates = this.predicates.map((item) => item instanceof Function ? item() : item);
            this.closure = false;
        }
        return this.predicates;
    }
}
exports.Rule = Rule;
