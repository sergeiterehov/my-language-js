import { Parser } from "../parser/Parser";
import { Group } from "../parser/Group";

export class Processor<T> {
    private parser: Parser;
    private handler: (group: Group) => T;

    constructor(handler: (group: Group) => T, parser: Parser) {
        this.parser = parser;
        this.handler = handler;
    }

    public process(source: string): T[] {
        const root = this.parser.parse(source);
        const results = root.getChildren().map(this.handler);

        return results;
    }
}
