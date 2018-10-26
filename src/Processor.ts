import { Token } from "./token/Token";
import { GroupDefinition } from "./group/GroupDefinition";
import { TokenizerDefinition } from "./token/TokenizerDefinition";
import { FinderDefinition } from "./group/FinderDefinition";
import { TokenDefinition } from "./token/TokenDefinition";
import { Group } from "./group/Group";

function extractTokensFromGroups(groups: GroupDefinition[]): TokenDefinition[] {
    // todo
    return [];
}

export type ProcessorHandleType<T> = (group: Group) => T;

export class Processor<T> {
    private handle: ProcessorHandleType<T>;
    private tokenizer: TokenizerDefinition;
    private finder: FinderDefinition;

    constructor(handle: ProcessorHandleType<T>, skipToken: Token, groups: GroupDefinition[]) {
        this.handle = handle;
        this.tokenizer = new TokenizerDefinition(extractTokensFromGroups(groups));
        this.finder = new FinderDefinition(groups);
    }

    public run(source: string): T {
        const tokens = this.tokenizer.parse(source);
        const tree = this.finder.parse(tokens);

        return this.handle(tree.getRoot());
    }
}
