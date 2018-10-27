import { TokenDefinition } from "../lexer/TokenDefinition";
import { Token } from "../lexer/Token";
import { RuleDefinition } from "./RuleDefinition";

export enum RuleOperation {
    And,
    Or,
    Any,
    MayBe,
}

export type RuleArgsType = Array<Rule | TokenDefinition | RuleDefinition>;

export class Rule {
    private operation: RuleOperation;
    private args: RuleArgsType;

    constructor(operation: RuleOperation, args: RuleArgsType) {
        this.operation = operation;
        this.args = args;
    }

    public getTokenDefinitions(): TokenDefinition[] {
        return []; // TODO
    }

    public find(tokens: Token[]): Token[] {
        return []; // TODO
    }
}
