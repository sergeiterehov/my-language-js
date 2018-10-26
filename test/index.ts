import { token } from "../src";

const $number = token(/\d+(\.\d+)?/);
const $plus = token(/\+/);
const $minus = token(/\-/);
const $times = token(/\*/);
const $div = token(/\//);
const $pow = token(/\*\*/);
const $b_open = token((/\(/));
const $b_close = token(/\)/);

const $skip = token(/\s\t\n/);

