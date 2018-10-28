import { TokenDefinition } from "../lexer/TokenDefinition";
import { Token } from "../lexer/Token";
import { GroupDefinition } from "./GroupDefinition";
import { Group } from "./Group";
import { TokenStream } from "../lexer/TokenStream";
export interface ITokenDefinitionProvider {
    getTokenDefinitions(): TokenDefinition[];
}
export declare enum RuleOperation {
    And = "AND",
    Or = "OR",
    Any = "ANY",
    Maybe = "MAYBE"
}
export declare type RulePredicatesType = Rule | TokenDefinition | GroupDefinition;
export declare type RulePredicatesClosureType = RulePredicatesType | (() => RulePredicatesType);
export declare type StructureType = Array<Group | Token>;
export declare class Rule implements ITokenDefinitionProvider {
    private operation;
    private predicates;
    private closure;
    private lockGetTokenDefinitions;
    constructor(operation: RuleOperation, predicates: RulePredicatesClosureType[]);
    getTokenDefinitions(): TokenDefinition[];
    find(stream: TokenStream): StructureType | void;
    private getPredicates;
}
