import { Token } from "../lexer/Token";
import { GroupDefinition } from "./GroupDefinition";
import { TokenDefinition } from "../lexer/TokenDefinition";

export type GroupDefinition = GroupDefinition | TokenDefinition;

export class Group {
    private definition: GroupDefinition;
    private structure: Array<Token | Group>;
    private tokens: Token[];
    private children: Group[];

    constructor(definition: GroupDefinition, structure: Array<Token | Group>) {
        this.definition = definition;
        this.structure = structure;
        this.tokens = structure.filter<Token>((item): item is Token => item instanceof Token);
        this.children = structure.filter<Group>((item): item is Group => item instanceof Group);
    }

    public get value(): string {
        return this.structure.reduce<Token[]>((list, item) => [
            ...list,
            ...(item instanceof Token ? [item] : item.getTokens()),
        ], []).map((token) => token.value).join("");
    }

    public get type(): GroupDefinition {
        return this.definition;
    }

    public is(definition: GroupDefinition): boolean {
        return this.definition === definition;
    }

    public has(definition: GroupDefinition | TokenDefinition): boolean {
        if (definition instanceof GroupDefinition) {
            return !! this.children.find((group) => group.is(definition));
        } else {
            return !! this.tokens.find((token) => definition === token.definition);
        }
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

    public getChildren(): Group[] {
        return [...this.children];
    }

    public stringify(separator: string = " ", level: number = 0): string {
        return this.structure.map((item) => {
            if (item instanceof Token) {
                return item.value;
            } else {
                return item.stringify(separator, level);
            }
        }).join(separator);
    }
}
