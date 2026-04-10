import {Horizon} from "@/entities/Horizon.js";
import {Section} from "@/entities/Section.js";
import {Excavation} from "@/entities/Excavation.js";
import {Node} from "@/entities/Node.js";

export const parseXml = (xmlString: string) => {
  const parser = new DOMParser()
  const xml = parser.parseFromString(xmlString, "text/xml")

  const nodeMap = new Map<number, Node>()

  xml.querySelectorAll("Nodes > Node").forEach((el) => {
    const id = Number(el.querySelector("Id")?.textContent)

    nodeMap.set(
      id,
      new Node(
        id,
        Number(el.querySelector("X")?.textContent),
        Number(el.querySelector("Y")?.textContent),
        Number(el.querySelector("Z")?.textContent)
      )
    )
  })

  const sectionMap = new Map<number, Section>()

  xml.querySelectorAll("Sections > Section").forEach((el) => {
    const id = Number(el.querySelector("Id")?.textContent)

    const start = nodeMap.get(
      Number(el.querySelector("StartNodeId")?.textContent)
    )!

    const end = nodeMap.get(
      Number(el.querySelector("EndNodeId")?.textContent)
    )!

    sectionMap.set(id, new Section(id, start, end))
  })

  const excavationMap = new Map<number, Excavation>()

  xml.querySelectorAll("Excavation").forEach((el) => {
    const id = Number(el.querySelector("Id")?.textContent)

    const sectionIds =
      el.querySelector("Sections")?.textContent
        ?.split(",")
        .map(Number) || []

    const sections = sectionIds
      .map((id) => sectionMap.get(id))
      .filter(Boolean) as Section[]

    excavationMap.set(
      id,
      new Excavation(
        id,
        el.querySelector("Name")?.textContent || "",
        sections
      )
    )
  })

  const sectionToExcavation = new Map<number, Excavation[]>()

  excavationMap.forEach((e) => {
    e.sections.forEach((s) => {
      if (!sectionToExcavation.has(s.id)) {
        sectionToExcavation.set(s.id, [])
      }
      sectionToExcavation.get(s.id)!.push(e)
    })
  })

  const horizons: Horizon[] = []

  xml.querySelectorAll("Horizons > Horizon").forEach((el) => {
    const id = Number(el.querySelector("Id")?.textContent)

    const sectionIds =
      el.querySelector("Sections")?.textContent
        ?.split(",")
        .map(Number) || []

    const sections = sectionIds
      .map((id) => sectionMap.get(id))
      .filter(Boolean) as Section[]

    const excavationsSet = new Set<Excavation>()

    sectionIds.forEach((sid) => {
      sectionToExcavation.get(sid)?.forEach((e) =>
        excavationsSet.add(e)
      )
    })

    horizons.push(
      new Horizon(
        id,
        el.querySelector("Name")?.textContent || "",
        sections,
        Array.from(excavationsSet)
      )
    )
  })

  return {
    nodes: nodeMap,
    sections: sectionMap,
    excavations: excavationMap,
    horizons,
  }
}