export type TokenDefinitionSourceType = RegExp;

export class TokenDefinition {
    private definition: TokenDefinitionSourceType;

    constructor(definition: TokenDefinitionSourceType) {
        this.definition = definition;
    }

    public getDefinition(): TokenDefinitionSourceType {
        return this.definition;
    }
}
