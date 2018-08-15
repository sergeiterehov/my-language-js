const { $tokens, $and, $or, $builder, $build, $extract } = require("./");

const src = 'name = 123';

// Tokens

const skip = $tokens(/\s+/s);

const $id = $tokens(/[_\w]+[_\d\w]*/);
const $string = $tokens(/'(?<content>[^'\\']*)'/);
const $number = $tokens(/-?[0-9]+(\.[0-9]+(e-?[0-9]+)?)?/);
const $boolean = $tokens(/true|false/);
const $liter = $tokens($string, $number, $boolean);
const $op = $tokens(/=|>|<|!=|!>|!<|>=|<=|==|===|!==|<<|\+|-|\*|\*\*|\\|%|&|\||&&|\|\||\^|!/);
const $sep = $tokens(/[\.,;(){}\[\]]/);

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

const hook = $and($sep.sel('{'), $sep.sel('{'), expression, $sep.sel('}'), $sep.sel('}'));

const dest = $or(
    $id,
    hook,
);

const load = $and(dest, $op.sel('='), expression);

// Builder

const builder = $builder([
    $build(sum, (a, op, b) => ['add', a, b]),
    $build(sub, (a, op, b) => ['sub', a, b]),
    $build(mul, (a, op, b) => ['mul', a, b]),
    $build(div, (a, op, b) => ['div', a, b]),
    $build(expression_inside, $extract(2)),
    $build(expression, $extract()),
    $build(hook, $extract(3, (name) => ['nameToVar', name])),
    $build(load, (dest, op, expr) => ['load', dest, expr]),
], skip);

// Test

const tree = builder.build(src);

console.log(tree);
