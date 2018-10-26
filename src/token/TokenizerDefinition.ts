import { Tokenizer } from "./Tokenizer";
import { TokenDefinition } from "./TokenDefinition";
import { Token } from "./Token";

export class TokenizerDefinition {
    private definitions: TokenDefinition[];

    constructor(tokens: TokenDefinition[]) {
        this.definitions = tokens;
    }

    public parse(source: string): Token[] {
        const tokenizer = new Tokenizer(this.definitions, source);

        return tokenizer.parse();
    }
}
