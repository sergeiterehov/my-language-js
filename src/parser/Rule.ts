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
    Maybe = "MAYBE",
}

export type RulePredicatesType = Rule | TokenDefinition | GroupDefinition;
export type RulePredicatesClosureType = RulePredicatesType | (() => RulePredicatesType);
export type StructureType = Array<Group | Token>;

export class Rule {
    private operation: RuleOperation;
    private predicates: RulePredicatesClosureType[];

    private closure: boolean = true;
    private lockGetTokenDefinitions: boolean = false;

    constructor(operation: RuleOperation, predicates: RulePredicatesClosureType[]) {
        this.operation = operation;
        this.predicates = predicates;
    }

    public getTokenDefinitions(): TokenDefinition[] {
        if (this.lockGetTokenDefinitions) {
            return [];
        }

        this.lockGetTokenDefinitions = true;

        const result = this.getPredicates().reduce<TokenDefinition[]>((list, item) => [
            ...list,
            ...(item instanceof TokenDefinition ? [item] : item.getTokenDefinitions()),
        ], []);

        this.lockGetTokenDefinitions = false;

        return result;
    }

    public find(stream: TokenStream): StructureType | void {
        const driver = new RuleDriver(this.operation, this.getPredicates(), stream);

        return driver.find();
    }

    private getPredicates(): RulePredicatesType[] {
        if (this.closure) {
            this.predicates = this.predicates.map<RulePredicatesType>(
                (item) => item instanceof Function ? item() : item,
            );
            this.closure = false;
        }

        return this.predicates as RulePredicatesType[];
    }
}
