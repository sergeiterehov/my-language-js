[![Build Status](https://semaphoreci.com/api/v1/sergeiterehov/my-language-js/branches/master/badge.svg)](https://semaphoreci.com/sergeiterehov/my-language-js)

# Create your own language!

> TypeScript ready!

This is smth like ANTLR...

## Install

```sh
npm i my-language
```

## How to import?

### TypeScript

```typescript
import { fragment, group, or, any, and, maybe, parser, processor, ProcessorHandler } from "my-language/src";
```

### JavaScript

```js
const { fragment, group, or, any, and, maybe, parser, processor } = require("my-language");
```

or

```js
import { fragment, group, or, any, and, maybe, parser, processor } from "my-language";
```

## Example: calculator implementation

If you wanna use JS, just remove types from this example.

Gramma:

```typescript
// Skippable fragments

const $skip = fragment(/[\s\t\n]+/s);

// Common fragments

const $number = fragment(/\d+(\.\d+)?/);
const $plus = fragment(/\+/);
const $minus = fragment(/\-/);
const $times = fragment(/\*/);
const $divide = fragment(/\//);
const $power = fragment(/\*\*/);
const $open = fragment(/\(/);
const $close = fragment(/\)/);

// Logical groups

const atom = group(or($number, and($open, () => expression, $close)));
const atomSigned = group(maybe($minus), atom);
const expressionPower = group(atomSigned, any($power, atomSigned));
const expressionTimes = group(expressionPower, any(or($times, $divide), expressionPower));
const expression = group(expressionTimes, any(or($plus, $minus), expressionTimes));
```

Parser:

```typescript
const calculatorParser = parser($skip, expression);
```

Processor handler:

```typescript
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
```

Create processor:

```typescript
const calculatorProcessor = processor(calculator, calculatorParser);
```

Test smaple:

```typescript
console.log(calculatorProcessor.process("10 * ((12 / 2 ** 2) * 5 + 6) - -10"));
```

Results:

```
[ 220 ]
```

> Have a good work!
