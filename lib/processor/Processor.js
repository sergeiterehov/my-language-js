"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Processor {
    constructor(handler, parser) {
        this.parser = parser;
        this.handler = handler;
    }
    process(source) {
        const root = this.parser.parse(source);
        const results = root.getChildren().map(this.handler);
        return results;
    }
}
exports.Processor = Processor;
