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
            let found = false;

            for (const definition of this.definitions) {
                const fragment = definition.find(source);

                if (! fragment) {
                    continue;
                }

                tokens.push(new Token(definition, fragment));
                source = source.substring(fragment.length);

                found = true;
            }

            if (! found) {
                throw new Error(`Unknown lexem: ${source.substr(0, 30)}...`);
            }
        }

        return tokens;
    }
}
