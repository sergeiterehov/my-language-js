import { Token } from "./Token";
import { TokenDefinition } from "./TokenDefinition";
export declare class LexerDriver {
    private definitions;
    private source;
    constructor(definitions: TokenDefinition[], source: string);
    parse(): Token[];
}
