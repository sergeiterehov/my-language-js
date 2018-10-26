import { TokenDefinition } from "./TokenDefinition";
import { Token } from "./Token";

export class Tokenizer {
    private definitions: TokenDefinition[];
    private source: string;

    constructor(definitions: TokenDefinition[], source: string) {
        this.definitions = definitions;
        this.source = source;
    }

    public parse(): Token[] {
        // todo
        return [];
    }
}
