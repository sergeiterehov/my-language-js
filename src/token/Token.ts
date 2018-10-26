import { TokenDefinition } from "./TokenDefinition";

export class Token {
    public definition: TokenDefinition;
    public value: string;

    constructor(definition: TokenDefinition, value: string) {
        this.definition = definition;
        this.value = value;
    }
}
