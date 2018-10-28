import { RuleOperation, RulePredicatesType, StructureType } from "./Rule";
import { TokenStream } from "../lexer/TokenStream";
export declare class RuleDriver {
    private operation;
    private predicates;
    private stream;
    constructor(operation: RuleOperation, predicates: RulePredicatesType[], stream: TokenStream);
    find(): StructureType | void;
    private findSuperStructure;
    private findPredicates;
    private and;
    private maybe;
    private or;
    private any;
}
