import { fragment, group, or, any, and, parser, maybe } from "../src";

const $skip = fragment(/[\s\t\n]+/s);

const $number = fragment(/\-?\d+(\.\d+)?/);
const $plus = fragment(/\+/);
const $minus = fragment(/\-/);
const $times = fragment(/\*/);
const $divide = fragment(/\//);
const $open = fragment(/\(/);
const $close = fragment(/\)/);

const constaint = group(or($number, and($open, () => expression, $close)));
const expression1 = group(constaint, maybe(or($times, $divide), constaint));
const expression = group(expression1, maybe(or($plus, $minus), expression1));

const calculatorParser = parser($skip, expression);

const source = "10 * ((12 / 2) * 5 + 6)";

const root = calculatorParser.parse(source);

console.log(root.getTokens().map((i) => i.value).join(" "));
