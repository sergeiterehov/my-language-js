// Step 1

const MLG = require('./');

const { token } = MLG;

const $number = token(/\d+(\.\d+)?/);
const $plus = token(/\+/);
const $minus = token(/\-/);
const $times = token(/\*/);
const $div = token(/\//);
const $pow = token(/\*\*/);
const $b_open = token(/\(/);
const $b_close = token(/\)/);

const $skip = token(/\s\t\n/);

// Step 2

const { group, or, and, any, maybe } = MLG;

const atom = group(or(
  $number,
  and($b_open, expression, $b_close),
));
const atomSigned = group(() => or(
  and($plus, atomSigned),
  and($minus, atomSigned),
  atom,
));
const expressionPow = group(and(atomSigned, any($pow, atomSigned)));
const expressionMul = group(and(expressionPow, any(or($times, $div), expressionPow)));
const expression = group(and(expressionMul, any(or($plus, $minus), expressionMul)));

// Step 3

const { processor } = MLG;

const calc = (group) => {
    switch(group.type) {
      case expression:
        return 0;
      case expressionMul:
        return group.all(group.all(expressionPow).map(calc).reduce((a, val) => group.has($times) ? a * val : a / val, 0));
      case expressionPow:
        return group.all(atomSigned).map(calc).reduce((a, val) => a ** val, 0);
      case atomSigned:
        return group.has(atomSigned) ? calc(group.get(atomSigned)) * (group.has($minus) ? -1 : 1) : calc(group.get(atom));
      case atom:
        return group.has($number) ? group.get($number).value : calc(group.get(expression));
    }
  };
  
  const calculator = processor($skip, calc, expression);
  
  const src = '1 + 10 * 2';
  
  console.log(src, '=', calculator.compile(src));
  