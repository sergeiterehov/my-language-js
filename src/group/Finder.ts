import { GroupDefinition } from "./GroupDefinition";
import { Token } from "../token/Token";
import { Tree } from "../tree/Tree";

export class Finder {
    private definitions: GroupDefinition[];
    private tokens: Token[];

    constructor(defintions, tokens) {
        this.definitions = defintions;
        this.tokens = tokens;
    }

    public parse(): Tree {
        //
    }
}
