const { $tokens, $and, $or, $builder, $rule, $extract } = require("./");

const src = 'name = 123';

// Tokens

const skip = $tokens(/\s+/s);

const $id = $tokens(/[_\w]+[_\d\w]*/);
const $string = $tokens(/'(?<content>[^'\\']*)'/);
const $number = $tokens(/-?[0-9]+(\.[0-9]+(e-?[0-9]+)?)?/);
const $boolean = $tokens(/true|false/);
const $liter = $tokens($string, $number, $boolean);
const $op = $tokens(/=|>|<|!=|!>|!<|>=|<=|==|===|!==|<<|\+|-|\*|\*\*|\\|%|&|\||&&|\|\||\^|!/);
const $sep = $tokens(/[\.,;(){}\[\]]|{{|}}/);

// Lexems

const expression = () => $or(
    expression_inside,
    sum,
    sub,
    mul,
    div,
    $liter,
    $id,
);

const expression_inside = $and($sep.sel('('), expression, $sep.sel(')'));

const sum = $and(expression, $op.sel('+'), expression);
const sub = $and(expression, $op.sel('-'), expression);
const mul = $and(expression, $op.sel('*'), expression);
const div = $and(expression, $op.sel('/'), expression);

const hook = $and($sep.sel('{{'), expression, $sep.sel('}}'));

const dest = $or(
    $id,
    hook,
);

const load = $and(dest, $op.sel('='), expression);

// Builder

const builder = $builder([
    $rule(sum, (a, op, b) => ['add', a, b]),
    $rule(sub, (a, op, b) => ['sub', a, b]),
    $rule(mul, (a, op, b) => ['mul', a, b]),
    $rule(div, (a, op, b) => ['div', a, b]),
    $rule(expression_inside, $extract(2, (expr) => expr)),
    $rule(expression, (expr) => expr),
    $rule(hook, $extract(2, (name) => ['nameToVar', name])),
    $rule(load, (dest, op, expr) => ['load', dest, expr]),
], skip);

// Test

const tree = builder.build(src);

console.log(tree);
