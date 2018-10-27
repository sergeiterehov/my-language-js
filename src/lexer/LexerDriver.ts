import { Token } from "./Token";
import { TokenDefinition } from "./TokenDefinition";

export class LexerDriver {
    private definitions: TokenDefinition[];
    private source: string;

    constructor(definitions: TokenDefinition[], source: string) {
        this.definitions = definitions;
        this.source = source;
    }

    public parse(): Token[] {
        return []; // TODO
    }
}
