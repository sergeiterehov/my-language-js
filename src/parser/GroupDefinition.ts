import { Token } from "../lexer/Token";
import { TokenDefinition } from "../lexer/TokenDefinition";
import { Rule } from "./Rule";
import { Group } from "./Group";

export class GroupDefinition {
    private rule: Rule | (() => Rule);
    private done: boolean;

    constructor(rule: Rule | (() => Rule)) {
        this.rule = rule;
        this.done = false;
    }

    public find(tokens: Token[]): Group | void {
        const found = this.getRule().find(tokens);

        if (! found) {
            return undefined;
        }

        return new Group(
            this,
            found.filter((item) => item instanceof Token) as Token[],
            found.filter((item) => item instanceof Group) as Group[],
        );
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
