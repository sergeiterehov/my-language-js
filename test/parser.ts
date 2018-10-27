import { TokenDefinition } from "../src/lexer/TokenDefinition";
import { GroupDefinition } from "../src/parser/GroupDefinition";
import { Rule, RuleOperation } from "../src/parser/Rule";
import { Lexer } from "../src/lexer/Lexer";

const $number = new TokenDefinition(/\d+/);
const $plus = new TokenDefinition(/\+/);
const $minus = new TokenDefinition(/\-/);
const $skip = new TokenDefinition(/\s\t\n/);

const $$sign = new GroupDefinition(new Rule(RuleOperation.Or, [$plus, $minus]));
const $$number = new GroupDefinition(new Rule(RuleOperation.And, [new Rule(RuleOperation.MayBe, [$$sign]), $number]));

const lexer = new Lexer($$number.getTokenDefinitions(), $skip);

const source = "-3 14 +15 9 26";
const tokens = lexer.parse(source);

const found = $$number.find(tokens);

console.log(found);
