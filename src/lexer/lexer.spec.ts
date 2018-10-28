import "mocha";
import { TokenDefinition } from "./TokenDefinition";
import { Lexer } from "./Lexer";

describe("Lexer", () => {
    it("simple integer parser", () => {
        const $number = new TokenDefinition(/\-?\d+/);
        const $skip = new TokenDefinition(/[\s\t\n]+/s);

        const lexer = new Lexer([$number], $skip);

        const source = "-1 0 1 2 3 4";
        const tokens = lexer.parse(source);

        if (tokens.length !== 6) {
            throw new Error("Should have 6 tokens found");
        }

        if (tokens.map((token) => token.value).join(" ") !== source) {
            throw new Error("Shold be equals to source");
        }
    });
});
