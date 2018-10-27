import { Token } from "../lexer/Token";
import { TokenDefinition } from "../lexer/TokenDefinition";
import { Rule } from "./Rule";
import { Group } from "./Group";
import { TokenStream } from "../lexer/TokenStream";

export class GroupDefinition {
    private rule: Rule | (() => Rule);

    private closure: boolean = true;
    private lockGetTokenDefinitions: boolean = false;

    constructor(rule: Rule | (() => Rule)) {
        this.rule = rule;
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

        return new Group(this, found);
    }

    public getTokenDefinitions(): TokenDefinition[] {
        if (this.lockGetTokenDefinitions) {
            return [];
        }

        this.lockGetTokenDefinitions = true;

        const result = this.getRule().getTokenDefinitions();

        this.lockGetTokenDefinitions = false;

        return result.reduce<TokenDefinition[]>(
            (list, item) => list.indexOf(item) !== -1 ? list : [...list, item],
            [],
        );
    }

    private getRule(): Rule {
        if (this.closure) {
            if (this.rule instanceof Function) {
                this.rule = this.rule();
            }

            this.closure = false;
        }

        return this.rule as Rule;
    }
}
