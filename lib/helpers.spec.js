"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const _1 = require("./");
describe("Helpers and shortcuts", () => {
    describe("calculator", () => {
        // Gramma
        const $skip = _1.fragment(/[\s\t\n]+/s);
        const $number = _1.fragment(/\d+(\.\d+)?/);
        const $plus = _1.fragment(/\+/);
        const $minus = _1.fragment(/\-/);
        const $times = _1.fragment(/\*/);
        const $divide = _1.fragment(/\//);
        const $power = _1.fragment(/\*\*/);
        const $open = _1.fragment(/\(/);
        const $close = _1.fragment(/\)/);
        const atom = _1.group(_1.or($number, _1.and($open, () => expression, $close)));
        const atomSigned = _1.group(_1.maybe($minus), atom);
        const expressionPower = _1.group(atomSigned, _1.any($power, atomSigned));
        const expressionTimes = _1.group(expressionPower, _1.any(_1.or($times, $divide), expressionPower));
        const expression = _1.group(expressionTimes, _1.any(_1.or($plus, $minus), expressionTimes));
        // Parser
        const calculatorParser = _1.parser($skip, expression);
        // Processor
        const calculator = (current) => {
            switch (current.type) {
                case atom: return current.has($number) ? Number(current.value) : calculator(current.get(expression));
                case atomSigned: return calculator(current.get(atom)) * (current.has($minus) ? -1 : 1);
            }
            const args = current.getChildren().map(calculator);
            const ops = current.getTokens().map((token) => token.definition);
            return args.reduce((a, b, i) => {
                switch (current.type) {
                    case expression: return ops[i] === $plus ? a + b : a - b;
                    case expressionTimes: return ops[i] === $times ? a * b : a / b;
                    case expressionPower: return a ** b;
                    default: return 0;
                }
            }, args.shift() || 0);
        };
        const calculatorProcessor = _1.processor(calculator, calculatorParser);
        // Test
        [
            {
                source: "1 + 2 + 3 - 5",
                target: [1],
            },
            {
                source: "1 2 3 2 *2 3+2\t(3*2+3+(1+1 --1))/2",
                target: [1, 2, 3, 4, 5, 6],
            },
            {
                source: "10 * ((12 / 2 ** 2) * 5 + 6) - -10",
                target: [220],
            },
        ].forEach(({ source, target }) => it(source, () => {
            const results = calculatorProcessor.process(source);
            if (results.length !== target.length) {
                throw new Error(`Expected ${target.length} tokens, received ${results.length}`);
            }
            results.forEach((value, i) => {
                if (value !== target[i]) {
                    throw new Error(`Expexted result ${target[i]}, received ${value}`);
                }
            });
        }));
    });
});
