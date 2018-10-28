"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenStream {
    constructor(tokens, start = 0) {
        this.list = tokens;
        this.pointer = start;
    }
    get position() {
        return this.pointer;
    }
    set position(value) {
        this.pointer = value;
    }
    get eof() {
        return this.pointer >= this.list.length;
    }
    get() {
        return this.list.slice(this.pointer);
    }
    length() {
        return this.list.length;
    }
    clone() {
        return new TokenStream(this.list, this.pointer);
    }
    get next() {
        return this.list[this.pointer++];
    }
}
exports.TokenStream = TokenStream;
