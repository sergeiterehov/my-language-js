import { TokenDefinition } from "../src/lexer/TokenDefinition";
import { RuleDefinition } from "../src/parser/RuleDefinition";
import { Rule, RuleOperation } from "../src/parser/Rule";

const $number = new TokenDefinition(/\d+/);
const $plus = new TokenDefinition(/\+/);
const $minus = new TokenDefinition(/\-/);
const $skip = new TokenDefinition(/\s\t\n/);

const $$sign = new RuleDefinition(new Rule(RuleOperation.Or, [$plus, $minus]));
const $$number = new RuleDefinition(new Rule(RuleOperation.And, [new Rule(RuleOperation.MayBe, [$$sign]), $number]));

console.log($$number);
