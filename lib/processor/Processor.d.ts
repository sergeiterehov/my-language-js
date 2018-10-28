import { Parser } from "../parser/Parser";
import { Group } from "../parser/Group";
export declare class Processor<T> {
    private parser;
    private handler;
    constructor(handler: (group: Group) => T, parser: Parser);
    process(source: string): T[];
}
