import { TokenDefinitionSourceType, TokenDefinition } from "./token/TokenDefinition";

export function token (definition: TokenDefinitionSourceType) {
    return new TokenDefinition(definition);
};
