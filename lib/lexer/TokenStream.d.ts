import { Token } from "./Token";
export declare class TokenStream {
    private list;
    private pointer;
    constructor(tokens: Token[], start?: number);
    position: number;
    readonly eof: boolean;
    get(): Token[];
    length(): number;
    clone(): TokenStream;
    readonly next: Token;
}
