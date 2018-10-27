import { GroupDefinition } from "./GroupDefinition";
import { Rule, RuleOperation } from "./Rule";
import { Group } from "./Group";
import { TokenStream } from "../lexer/TokenStream";
import { Lexer } from "../lexer/Lexer";
import { TokenDefinition } from "../lexer/TokenDefinition";

export class Parser {
    private root: GroupDefinition;
    private lexer: Lexer;

    constructor(definitions: GroupDefinition[], skip: TokenDefinition) {
        this.root = new GroupDefinition(new Rule(RuleOperation.Any, definitions));
        this.lexer = new Lexer(this.root.getTokenDefinitions(), skip);
    }

    public parse(source: string): Group {
        const tokens = this.lexer.parse(source);
        const stream = new TokenStream(tokens);
        const group = this.root.find(stream);

        if (! group) {
            throw new Error("Absolutely nothing found");
        }

        return group;
    }
}
