import { RuleOperation, RulePredicatesType, StructureType, Rule } from "./Rule";
import { Token } from "../lexer/Token";
import { TokenDefinition } from "../lexer/TokenDefinition";
import { Group } from "./Group";
import { TokenStream } from "../lexer/TokenStream";

export class RuleDriver {
    private operation: RuleOperation;
    private predicates: RulePredicatesType[];
    private stream: TokenStream;

    constructor(operation: RuleOperation, predicates: RulePredicatesType[], stream: TokenStream) {
        this.operation = operation;
        this.predicates = predicates;
        this.stream = stream;
    }

    public find(): StructureType | void {
        // Save pointer before it will have changed
        const backup = this.stream.position;

        // Try to validate predicates
        const superStructure = this.findSuperStructure();

        // Log
        // console.log(backup, this.operation, !! structureRaw);

        if (! superStructure) {
            // Nothing found, restore pointer
            this.stream.position = backup;

            return;
        }

        // Create flat structure
        const structure = superStructure.reduce<StructureType>((list, item) => [
            ...list,
            ...(item instanceof Array ? item.filter<Token | Group>(
                (sub): sub is Token | Group => !! sub) : item ? [item] : []
            ),
        ], []);

        return structure;
    }

    private findSuperStructure() {
        switch (this.operation) {
            case RuleOperation.And: return this.and();
            case RuleOperation.Or: return this.or();
            case RuleOperation.Maybe: return this.maybe();
            case RuleOperation.Any: return this.any();
        }

        throw new Error("Unknow operation of rule");
    }

    private findPredicates() {
        if (! this.stream.eof) {
            return this.predicates.map((predicate) => {
                if (predicate instanceof TokenDefinition) {
                    if (! this.stream.eof) {
                        const token = this.stream.next;

                        if (token && predicate === token.definition) {
                            return token;
                        }
                    }
                } else if (predicate instanceof Rule) {
                    return predicate.find(this.stream);
                } else {
                    return predicate.find(this.stream);
                }
            });
        }
    }

    private and() {
        const structure = this.findPredicates();

        if (structure) {
            return structure.findIndex((item) => ! item) !== -1 ? undefined : structure;
        }
    }

    private maybe() {
        const structure = new RuleDriver(RuleOperation.And, [...this.predicates], this.stream).find();

        if (structure) {
            return [structure];
        }

        return [];
    }

    private or() {
        const structure = this.predicates.reduce<StructureType | void>(
            (result, predicate) => result || new RuleDriver(RuleOperation.And, [predicate], this.stream).find(),
            undefined,
        );

        return structure;
    }

    private any(): StructureType[] {
        const structure = new RuleDriver(RuleOperation.And, [...this.predicates], this.stream).find();

        if (structure) {
            return [structure, ...this.any()];
        }

        return [];
    }
}
