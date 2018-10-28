import { GroupDefinition } from "./GroupDefinition";
import { Group } from "./Group";
import { TokenDefinition } from "../lexer/TokenDefinition";
export declare class Parser {
    private root;
    private lexer;
    constructor(definitions: GroupDefinition[], skip: TokenDefinition);
    parse(source: string): Group;
}
