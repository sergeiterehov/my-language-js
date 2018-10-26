import { TokenDefinition } from "../token/TokenDefinition";
import { GroupOperationDefinition } from "./operations/GroupOperationDefinition";

export type GroupDefinitionSourceType = GroupDefinition | TokenDefinition | GroupOperationDefinition;
export type GroupDefinitionClosureSourceType = GroupDefinitionSourceType | (() => GroupDefinitionSourceType);

export class GroupDefinition {
    private definitions: GroupDefinitionClosureSourceType[];

    constructor(definitions: GroupDefinitionClosureSourceType[]) {
        this.definitions = definitions;
    }
}
