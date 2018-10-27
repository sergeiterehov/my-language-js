import { TokenDefinition } from "../lexer/TokenDefinition";
import { Token } from "../lexer/Token";
import { GroupDefinition } from "./GroupDefinition";
import { Group } from "./Group";

export enum RuleOperation {
    And,
    Or,
    Any,
    MayBe,
}

export type RuleArgsType = Array<Rule | TokenDefinition | GroupDefinition>;

export class Rule {
    private operation: RuleOperation;
    private predicates: RuleArgsType;

    constructor(operation: RuleOperation, predicates: RuleArgsType) {
        this.operation = operation;
        this.predicates = predicates;
    }

    public getTokenDefinitions(): TokenDefinition[] {
        const definitions: TokenDefinition[] = [];

        this.predicates.forEach((item) => {
            if (item instanceof TokenDefinition) {
                definitions.push(item);
            } else {
                definitions.push(...item.getTokenDefinitions());
            }
        });

        return definitions;
    }

    public find(tokens: Token[]): Array<Group | Token> | void {
        const match = this.scan(tokens);

        if (! this.validate(match)) {
            return undefined;
        }

        const structure = match.filter((item) => !! item) as Array<Group | Token | Array<Group | Token>>;

        return structure.reduce<Array<Group | Token>>((list, item) => {
            if (item instanceof Array) {
                list.push(...item);
            } else {
                list.push(item);
            }

            return list;
        }, []);
    }

    protected validate<T>(match: T[]): boolean {
        return (
            false
            || this.operation === RuleOperation.And && ! match.find((item) => ! item)
            || this.operation === RuleOperation.Or && !! match.find((item) => !! item)
            || this.operation === RuleOperation.Any
            || this.operation === RuleOperation.MayBe
        );
    }

    private findStructure(tokens: Token[]): Array<void | Group | Token | Array<Group | Token>> {
        return this.predicates.map((predicate, i) => {
            if (predicate instanceof TokenDefinition) {
                if (tokens[i].definition === predicate) {
                    return tokens[i];
                }

                return undefined;
            } else if (predicate instanceof Rule) {
                return predicate.find(tokens.slice(i));
            } else if (predicate instanceof GroupDefinition) {
                return predicate.find(tokens.slice(i));
            }
        });
    }

    private scan(tokens: Token[]) {
        if (this.operation === RuleOperation.Any) {
            const result = [];

            while (true) {
                const found = this.findStructure(tokens);

                if (found.length === 0) {
                    break;
                }

                result.push(...found);
            }

            return result;
        }

        return this.findStructure(tokens);
    }
}
