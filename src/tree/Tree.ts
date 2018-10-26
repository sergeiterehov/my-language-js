import { Group } from "../group/Group";

export class Tree {
    private root: Group;

    constructor(root: Group) {
        this.root = root;
    }

    public getRoot() {
        return this.root;
    }
}
