import { Parser } from "../parser/Parser";
import { Group } from "../parser/Group";

export class Processor<T> {
    private parser: Parser;
    private handle: (group: Group) => T;

    constructor(handle: (group: Group) => T, parser: Parser) {
        this.parser = parser;
        this.handle = handle;
    }

    public process(source: string): T[] {
        const root = this.parser.parse(source);
        const results = root.getChildren().map(this.handle);

        return results;
    }
}
