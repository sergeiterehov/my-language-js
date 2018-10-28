import { fragment, group, or, any, and, maybe, parser, processor } from "../src";
import { Group } from "../src/parser/Group";

// Gramma

const $skip = fragment(/[\s\t\n]+/s);

const $number = fragment(/\d+(\.\d+)?/);
const $plus = fragment(/\+/);
const $minus = fragment(/\-/);
const $times = fragment(/\*/);
const $divide = fragment(/\//);
const $power = fragment(/\*\*/);
const $open = fragment(/\(/);
const $close = fragment(/\)/);

const atom = group(or($number, and($open, () => expression, $close)));
const atomSigned = group(maybe($minus), atom);
const expressionPower = group(atomSigned, any($power, atomSigned));
const expressionTimes = group(expressionPower, any(or($times, $divide), expressionPower));
const expression = group(expressionTimes, any(or($plus, $minus), expressionTimes));

// Parser

const calculatorParser = parser($skip, expression);

// Processor

const calculator = (current: Group): number => {
    const args = current.getChildren().map(calculator);
    const ops = current.getTokens().map((token) => token.definition);

    switch (current.type) {
        case atom: return current.has($number) ? Number(current.value) : calculator(current.get(expression));
        case atomSigned: return calculator(current.get(atom)) * (current.has($minus) ? -1 : 1);
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

const calculatorProcessor = processor(calculator, calculatorParser);

// Test

const results = calculatorProcessor.process("10 * ((12 / 2 ** 2) * 5 + 6) - -10");

console.assert(results.length === 1, "Should contains 1 expression");
console.assert(results[0] === 220, "Should be equal 220");
