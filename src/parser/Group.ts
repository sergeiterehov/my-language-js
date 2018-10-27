import { Token } from "../lexer/Token";
import { RuleDefinition } from "./RuleDefinition";
import { TokenDefinition } from "../lexer/TokenDefinition";

export type GroupDefinition = RuleDefinition | TokenDefinition;

export class Group {
    private definition: GroupDefinition;
    private tokens: Token[];
    private children: Group[];

    constructor(definition: GroupDefinition, tokens: Token[], children: Group[]) {
        this.definition = definition;
        this.tokens = tokens;
        this.children = children;
    }

    public value(): string {
        if (this.tokens.length !== 1) {
            throw new Error("More than 1 token in group");
        }

        return this.tokens[0].value;
    }

    public is(definition: GroupDefinition): boolean {
        return this.definition === definition;
    }

    public has(definition: GroupDefinition): boolean {
        return !! this.children.find((group) => group.is(definition));
    }

    public all(definition: GroupDefinition): Group[] {
        return this.children.filter((group) => group.is(definition));
    }

    public get(definition: GroupDefinition): Group {
        const result = this.children.find((group) => group.is(definition));

        if (! result) {
            throw new Error("Group not found by definition");
        }

        return result;
    }
}
