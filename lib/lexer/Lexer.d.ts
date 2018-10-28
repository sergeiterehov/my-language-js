import { Token } from "./Token";
import { TokenDefinition } from "./TokenDefinition";
export declare class Lexer {
    private definitions;
    private skip;
    constructor(definitions: TokenDefinition[], skip: TokenDefinition);
    parse(source: string): Token[];
}
