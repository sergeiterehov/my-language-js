import { TokenDefinition } from "../lexer/TokenDefinition";
import { Rule, ITokenDefinitionProvider } from "./Rule";
import { Group } from "./Group";
import { TokenStream } from "../lexer/TokenStream";
export declare class GroupDefinition implements ITokenDefinitionProvider {
    private rule;
    private closure;
    private lockGetTokenDefinitions;
    constructor(rule: Rule | (() => Rule));
    find(stream: TokenStream): Group | void;
    getTokenDefinitions(): TokenDefinition[];
    private getRule;
}
