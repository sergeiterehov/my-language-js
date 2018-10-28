"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = require("./Rule");
const TokenDefinition_1 = require("../lexer/TokenDefinition");
class RuleDriver {
    constructor(operation, predicates, stream) {
        this.operation = operation;
        this.predicates = predicates;
        this.stream = stream;
    }
    find() {
        // Save pointer before it will have changed
        const backup = this.stream.position;
        // Try to validate predicates
        const superStructure = this.findSuperStructure();
        // Log
        // console.log(backup, this.operation, !! structureRaw);
        if (!superStructure) {
            // Nothing found, restore pointer
            this.stream.position = backup;
            return;
        }
        // Create flat structure
        const structure = superStructure.reduce((list, item) => [
            ...list,
            ...(item instanceof Array ? item.filter((sub) => !!sub) : item ? [item] : []),
        ], []);
        return structure;
    }
    findSuperStructure() {
        switch (this.operation) {
            case Rule_1.RuleOperation.And: return this.and();
            case Rule_1.RuleOperation.Or: return this.or();
            case Rule_1.RuleOperation.Maybe: return this.maybe();
            case Rule_1.RuleOperation.Any: return this.any();
        }
        throw new Error("Unknow operation of rule");
    }
    findPredicates() {
        if (!this.stream.eof) {
            return this.predicates.map((predicate) => {
                if (predicate instanceof TokenDefinition_1.TokenDefinition) {
                    if (!this.stream.eof) {
                        const token = this.stream.next;
                        if (token && predicate === token.definition) {
                            return token;
                        }
                    }
                }
                else if (predicate instanceof Rule_1.Rule) {
                    return predicate.find(this.stream);
                }
                else {
                    return predicate.find(this.stream);
                }
            });
        }
    }
    and() {
        const structure = this.findPredicates();
        if (structure) {
            return structure.findIndex((item) => !item) !== -1 ? undefined : structure;
        }
    }
    maybe() {
        const structure = new RuleDriver(Rule_1.RuleOperation.And, [...this.predicates], this.stream).find();
        if (structure) {
            return [structure];
        }
        return [];
    }
    or() {
        const structure = this.predicates.reduce((result, predicate) => result || new RuleDriver(Rule_1.RuleOperation.And, [predicate], this.stream).find(), undefined);
        return structure;
    }
    any() {
        const structure = new RuleDriver(Rule_1.RuleOperation.And, [...this.predicates], this.stream).find();
        if (structure) {
            return [structure, ...this.any()];
        }
        return [];
    }
}
exports.RuleDriver = RuleDriver;
