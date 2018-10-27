import { LexerDriver } from "./LexerDriver";
import { Token } from "./Token";
import { TokenDefinition } from "./TokenDefinition";

export class Lexer {
    private definitions: TokenDefinition[];
    private skip: TokenDefinition;

    constructor(definitions: TokenDefinition[], skip: TokenDefinition) {
        this.definitions = [...definitions, skip];
        this.skip = skip;
    }

    public parse(source: string): Token[] {
        const driver = new LexerDriver(this.definitions, source);
        const tokens = driver.parse().filter((token) => token.definition !== this.skip);

        return tokens;
    }
}
