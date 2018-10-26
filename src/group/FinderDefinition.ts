import { Token } from "../token/Token";
import { GroupDefinition } from "./GroupDefinition";
import { Finder } from "./Finder";
import { Tree } from "../tree/Tree";

export class FinderDefinition {
    private definitions: GroupDefinition[];

    constructor(definitions: GroupDefinition[]) {
        this.definitions = definitions;
    }

    public parse(tokens: Token[]): Tree {
        const finder = new Finder(this.definitions, tokens);

        return finder.parse();
    }
}