import { Token } from "../lexer/Token";
import { GroupDefinition } from "./GroupDefinition";
import { TokenDefinition } from "../lexer/TokenDefinition";

export type GroupDefinition = GroupDefinition | TokenDefinition;

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
        return this.tokens.map((token) => token.value).join("");
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

    public getTokens(): Token[] {
        return [...this.tokens];
    }
}
