"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenDefinition_1 = require("./lexer/TokenDefinition");
const GroupDefinition_1 = require("./parser/GroupDefinition");
const Rule_1 = require("./parser/Rule");
const Parser_1 = require("./parser/Parser");
const Processor_1 = require("./processor/Processor");
function fragment(rule) {
    return new TokenDefinition_1.TokenDefinition(rule);
}
exports.fragment = fragment;
function group(...predicates) {
    return new GroupDefinition_1.GroupDefinition(and(...predicates));
}
exports.group = group;
function and(...predicates) {
    return new Rule_1.Rule(Rule_1.RuleOperation.And, predicates);
}
exports.and = and;
function or(...predicates) {
    return new Rule_1.Rule(Rule_1.RuleOperation.Or, predicates);
}
exports.or = or;
function maybe(...predicates) {
    return new Rule_1.Rule(Rule_1.RuleOperation.Maybe, predicates);
}
exports.maybe = maybe;
function any(...predicates) {
    return new Rule_1.Rule(Rule_1.RuleOperation.Any, predicates);
}
exports.any = any;
function parser(skip, ...definitions) {
    return new Parser_1.Parser(definitions, skip);
}
exports.parser = parser;
function processor(handler, parserDefinition) {
    return new Processor_1.Processor(handler, parserDefinition);
}
exports.processor = processor;
