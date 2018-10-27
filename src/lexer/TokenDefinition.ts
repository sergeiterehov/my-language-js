export type TokenDefinitionRule = RegExp;

export class TokenDefinition {
    private rule: TokenDefinitionRule;

    constructor(rule: TokenDefinitionRule) {
        this.rule = rule;
    }

    public find(source: string): string | void {
        const found = this.rule.exec(source);

        if (! found) {
            return undefined;
        }

        return found[0];
    }
}
