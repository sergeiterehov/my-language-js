import { TokenDefinition, TokenDefinitionRule } from "./lexer/TokenDefinition";
import { GroupDefinition } from "./parser/GroupDefinition";
import { Rule, RuleOperation, RulePredicatesClosureType } from "./parser/Rule";
import { Parser } from "./parser/Parser";

export function fragment(rule: TokenDefinitionRule): TokenDefinition {
    return new TokenDefinition(rule);
}

export function group(...predicates: RulePredicatesClosureType[]): GroupDefinition {
    return new GroupDefinition(and(...predicates));
}

export function and(...predicates: RulePredicatesClosureType[]): Rule {
    return new Rule(RuleOperation.And, predicates);
}

export function or(...predicates: RulePredicatesClosureType[]): Rule {
    return new Rule(RuleOperation.Or, predicates);
}

export function maybe(...predicates: RulePredicatesClosureType[]): Rule {
    return new Rule(RuleOperation.MayBe, predicates);
}

export function any(...predicates: RulePredicatesClosureType[]): Rule {
    return new Rule(RuleOperation.Any, predicates);
}

export function parser(skip: TokenDefinition, ...definitions: GroupDefinition[]): Parser {
    return new Parser(definitions, skip);
}
