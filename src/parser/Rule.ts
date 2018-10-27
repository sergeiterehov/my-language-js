import { TokenDefinition } from "../lexer/TokenDefinition";
import { Token } from "../lexer/Token";
import { GroupDefinition } from "./GroupDefinition";
import { Group } from "./Group";
import { RuleDriver } from "./RuleDriver";
import { TokenStream } from "../lexer/TokenStream";

export enum RuleOperation {
    And = "AND",
    Or = "OR",
    Any = "ANY",
    MayBe = "MAYBE",
}

export type RulePredicatesType = Array<Rule | TokenDefinition | GroupDefinition>;
export type StructureType = Array<Group | Token>;

export class Rule {
    private operation: RuleOperation;
    private predicates: RulePredicatesType;

    constructor(operation: RuleOperation, predicates: RulePredicatesType) {
        this.operation = operation;
        this.predicates = predicates;
    }

    public getTokenDefinitions(): TokenDefinition[] {
        return this.predicates.reduce<TokenDefinition[]>((list, item) => [
            ...list,
            ...(item instanceof TokenDefinition ? [item] : item.getTokenDefinitions()),
        ], []);
    }

    public find(stream: TokenStream): StructureType | void {
        const driver = new RuleDriver(this.operation, this.predicates, stream);

        return driver.find();
    }
}
