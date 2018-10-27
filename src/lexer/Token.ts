import { TokenDefinition } from "./TokenDefinition";

export class Token {
    public definition: TokenDefinition;
    public value: string;

    constructor(type: TokenDefinition, value: string) {
        this.definition = type;
        this.value = value;
    }
}
