import { Token } from "./Token";

export class TokenStream {
    private list: Token[];
    private pointer: number;

    constructor(tokens: Token[], start: number = 0) {
        this.list = tokens;
        this.pointer = start;
    }

    public get position(): number {
        return this.pointer;
    }

    public set position(value: number) {
        this.pointer = value;
    }

    public get(): Token[] {
        return this.list.slice(this.pointer);
    }

    public length(): number {
        return this.list.length;
    }

    public clone(): TokenStream {
        return new TokenStream(this.list, this.pointer);
    }

    public read(): Token {
        return this.list[this.pointer++];
    }
}
