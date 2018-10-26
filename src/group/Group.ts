import { GroupDefinition } from "./GroupDefinition";
import { TokenDefinition } from "../token/TokenDefinition";

export class Group {
    public type: typeof GroupDefinition | TokenDefinition;
    public value: string;
    public children: Group[];

    constructor(type: typeof GroupDefinition | TokenDefinition, value: string, children: Group[]) {
        this.type = type;
        this.value = value;
        this.children = children;
    }
}