export type TokenDefinitionRule = RegExp;

export class TokenDefinition {
    private rule: TokenDefinitionRule;

    constructor(rule: TokenDefinitionRule) {
        this.rule = rule;
    }

    public find(source: string): string {
        const found = this.rule.exec(source);

        if (found.length === 0) {
            return undefined;
        }

        return found[0];
    }
}
