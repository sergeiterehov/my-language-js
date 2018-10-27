import { TokenDefinition } from "../src/lexer/TokenDefinition";
import { GroupDefinition } from "../src/parser/GroupDefinition";
import { Rule, RuleOperation } from "../src/parser/Rule";
import { Lexer } from "../src/lexer/Lexer";
import { TokenStream } from "../src/lexer/TokenStream";

const $number = new TokenDefinition(/\d+/);
const $plus = new TokenDefinition(/\+/);
const $minus = new TokenDefinition(/\-/);

const $skip = new TokenDefinition(/[\s\t\n]+/s);

const $$sign = new GroupDefinition(new Rule(RuleOperation.Or, [$plus, $minus]));
const $$number = new GroupDefinition(new Rule(RuleOperation.And, [new Rule(RuleOperation.MayBe, [$$sign]), $number]));

const $$line = new GroupDefinition(new Rule(RuleOperation.Any, [$$number]));

const lexer = new Lexer($$line.getTokenDefinitions(), $skip);

const source = "-1 2 3";
const tokens = lexer.parse(source);
const stream = new TokenStream(tokens);

const found = $$line.find(stream);

if (found) {
    console.log(found.getTokens());
    console.log(found.get($$number).value());
}
