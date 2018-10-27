import { Token } from "../lexer/Token";
import { TokenDefinition } from "../lexer/TokenDefinition";
import { Rule } from "./Rule";

export class RuleDefinition {
    private rule: Rule | (() => Rule);
    private done: boolean;

    constructor(rule: Rule | (() => Rule)) {
        this.rule = rule;
        this.done = false;
    }

    public find(tokens: Token[]): Token[] {
        return this.getRule().find(tokens);
    }

    public getTokenDefinitions(): TokenDefinition[] {
        return this.getRule().getTokenDefinitions();
    }

    private getRule(): Rule {
        this.prepare();

        return this.rule as Rule;
    }

    private prepare() {
        if (this.done) {
            return;
        }

        if (this.rule instanceof Function) {
            this.rule = this.rule();
        }

        this.done = true;
    }
}
