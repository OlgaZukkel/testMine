import {Section} from "@/entities/Section.js";

export class Horizon {
  constructor(
    public id: number,
    public name: string,
    public sections: Section[]
  ) {}
}