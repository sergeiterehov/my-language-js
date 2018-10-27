import { TokenDefinition } from "../src/lexer/TokenDefinition";
import { Lexer } from "../src/lexer/Lexer";

const $number = new TokenDefinition(/\d+/);
const $skip = new TokenDefinition(/\s\t\n/);

const lexer = new Lexer([$number], $skip);

const source = "1 2 3 4";
const tokens = lexer.parse(source);

console.assert(tokens.length === 4, "Should contains 4 tokens");
