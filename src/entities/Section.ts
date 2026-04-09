import {Node} from "@/entities/Node.js";
export class Section {
  constructor(
    public id: number,
    public start: Node,
    public end: Node
  ) {}
}