import {Section} from "@/entities/Section.js";
import {Node} from "@/entities/Node.js";
import {Excavation} from "@/entities/Excavation.js";
import {Horizon} from "@/entities/Horizon.js";

export type LineType = {
  id: number
  points: [number, number, number][]
}
export type MineData = {
  nodes: Map<number, Node>
  sections: Map<number, Section>
  excavations: Map<number, Excavation>
  horizons: Horizon[]
}