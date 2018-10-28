import { TokenDefinition } from "./TokenDefinition";
export declare class Token {
    definition: TokenDefinition;
    value: string;
    constructor(type: TokenDefinition, value: string);
}
