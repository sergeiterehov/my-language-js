import "mocha";
import { fragment, group, or, any, and, maybe, parser, processor, ProcessorHandler } from "../src";
import { Group } from "../src/parser/Group";

describe("Helpers and shortcuts", () => {
    describe("calculator", () => {
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

        const calculator: ProcessorHandler<number> = (current) => {
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

        const calculatorProcessor = processor(calculator, calculatorParser);

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
        ].forEach(({source, target}) => it(source, () => {
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
