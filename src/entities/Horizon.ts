import {Section} from "@/entities/Section.js";
import {Excavation} from "@/entities/Excavation.js";

export class Horizon {
  constructor(
    public id: number,
    public name: string,
    public sections: Section[],
    public excavations: Excavation[]
  ) {}
}