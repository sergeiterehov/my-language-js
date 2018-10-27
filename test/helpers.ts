import { fragment, group, or, any, and, parser } from "../src";
import { Group } from "../src/parser/Group";

const $skip = fragment(/[\s\t\n]+/s);

const $number = fragment(/\-?\d+(\.\d+)?/);
const $plus = fragment(/\+/);
const $minus = fragment(/\-/);
const $times = fragment(/\*/);
const $divide = fragment(/\//);
const $power = fragment(/\*\*/);
const $open = fragment(/\(/);
const $close = fragment(/\)/);

const atom = group(or($number, and($open, () => expression, $close)));
const expressionPower = group(atom, any($power, atom));
const expressionTimes = group(expressionPower, any(or($times, $divide), expressionPower));
const expression = group(expressionTimes, any(or($plus, $minus), expressionTimes));

const calculatorParser = parser($skip, expression);

const source = "10 * ((12 / 2 ** 2) * 5 + 6)";

const root = calculatorParser.parse(source);

const calculator = (current: Group): number => {
    const args = current.getChildren().map(calculator);
    const ops = current.getTokens().map((token) => token.definition);

    if (current.is(atom)) {
        return current.has($number) ? Number(current.value) : calculator(current.get(expression));
    }

    return args.reduce((y, x, i) => {
        switch (current.type) {
            case expression: return ops[i] === $plus ? y + x : y - x;
            case expressionTimes: return ops[i] === $times ? y * x : y / x;
            case expressionPower: return y ** x;
            default: return 0;
        }
    }, args.shift() || 0);
};

const results = root.all(expression).map(calculator);

console.assert(results.length === 1, "Should contains 1 expression");
console.assert(results[0] === 210, "'10 * ((12 / 2 ** 2) * 5 + 6)' should be equal 210");
