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
        let source = this.source;
        const tokens: Token[] = [];

        while (source.length > 0) {
            const found = [];

            for (const definition of this.definitions) {
                const fragment = definition.find(source);

                if (fragment) {
                    found.push(new Token(definition, fragment));
                }
            }

            if (found.length === 0) {
                throw new Error(`Unknown lexem: ${source.substr(0, 30)}...`);
            }

            const token = found.sort((a, b) => b.value.length - a.value.length)[0];

            tokens.push(token);
            source = source.substring(token.value.length);
        }

        return tokens;
    }
}
