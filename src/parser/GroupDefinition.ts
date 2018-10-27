import { Token } from "../lexer/Token";
import { TokenDefinition } from "../lexer/TokenDefinition";
import { Rule } from "./Rule";
import { Group } from "./Group";
import { TokenStream } from "../lexer/TokenStream";

export class GroupDefinition {
    private rule: Rule | (() => Rule);
    private done: boolean;

    constructor(rule: Rule | (() => Rule)) {
        this.rule = rule;
        this.done = false;
    }

    public find(stream: TokenStream): Group | void {
        const found = this.getRule().find(stream);

        /**
         * Array<Token | Group> | void
         *
         * If we have found set, then create Group.
         * Group can be created here only!
         */

        if (! found) {
            return undefined;
        }

        return new Group(
            this,
            found.reduce<Token[]>((list, item) => [
                ...list,
                ...(item instanceof Token ? [item] : item.getTokens()),
            ], []),
            found.filter<Group>((item): item is Group => item instanceof Group),
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
