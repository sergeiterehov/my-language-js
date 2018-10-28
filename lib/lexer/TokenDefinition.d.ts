export declare type TokenDefinitionRule = RegExp;
export declare class TokenDefinition {
    private rule;
    constructor(rule: TokenDefinitionRule);
    find(source: string): string | void;
}
