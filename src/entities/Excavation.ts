import {Section} from "@/entities/Section.js";

export class Excavation {
  visible = true

  constructor(
    public id: number,
    public name: string,
    public sections: Section[]
  ) {}
}