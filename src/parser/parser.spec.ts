import "mocha";
import { TokenDefinition } from "../lexer/TokenDefinition";
import { GroupDefinition } from "./GroupDefinition";
import { Rule, RuleOperation } from "./Rule";
import { Lexer } from "../lexer/Lexer";
import { TokenStream } from "../lexer/TokenStream";

describe("Parser", () => {
    it("simple integer parser", () => {
        const $number = new TokenDefinition(/\d+/);
        const $plus = new TokenDefinition(/\+/);
        const $minus = new TokenDefinition(/\-/);

        const $skip = new TokenDefinition(/[\s\t\n]+/s);

        const $$sign = new GroupDefinition(new Rule(RuleOperation.Or, [$plus, $minus]));
        const $$number = new GroupDefinition(new Rule(RuleOperation.And, [
            new Rule(RuleOperation.Maybe, [$$sign]),
            $number,
        ]));

        const $$line = new GroupDefinition(new Rule(RuleOperation.Any, [$$number]));

        const lexer = new Lexer($$line.getTokenDefinitions(), $skip);

        const source = "-1 2 3";
        const tokens = lexer.parse(source);
        const stream = new TokenStream(tokens);

        const found = $$line.find(stream);

        if (! found) {
            throw new Error("Should return some result");
        }

        if (found.all($$number).map((item) => item.value).join(" ") !== source) {
            throw new Error("Should be equal to source");
        }
    });
});
