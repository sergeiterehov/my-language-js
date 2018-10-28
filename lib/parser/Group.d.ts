import { Token } from "../lexer/Token";
import { GroupDefinition } from "./GroupDefinition";
import { TokenDefinition } from "../lexer/TokenDefinition";
export declare type GroupDefinition = GroupDefinition | TokenDefinition;
export declare class Group {
    private definition;
    private structure;
    private tokens;
    private children;
    constructor(definition: GroupDefinition, structure: Array<Token | Group>);
    readonly value: string;
    readonly type: GroupDefinition;
    is(definition: GroupDefinition): boolean;
    has(definition: GroupDefinition | TokenDefinition): boolean;
    all(definition: GroupDefinition): Group[];
    get(definition: GroupDefinition): Group;
    getTokens(): Token[];
    getChildren(): Group[];
    stringify(separator?: string, level?: number): string;
}
