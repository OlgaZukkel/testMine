import {ExcavationType, HorizonType, NodeType, SectionType} from "@/types.js";

export const parseXml = (xmlString: string) => {
  const parser = new DOMParser()
  const xml = parser.parseFromString(xmlString, "text/xml")

  const nodeMap = new Map<number, NodeType>()

  xml.querySelectorAll("Node").forEach((el) => {
    const id = Number(el.querySelector("Id")?.textContent)
    nodeMap.set(id, {
      id,
      x: Number(el.querySelector("X")?.textContent),
      y: Number(el.querySelector("Y")?.textContent),
      z: Number(el.querySelector("Z")?.textContent),
    })
  })

  const sectionMap = new Map<number, SectionType>()

  xml.querySelectorAll("Section").forEach((el) => {
    const id = Number(el.querySelector("Id")?.textContent)
    const startId = Number(el.querySelector("StartNodeId")?.textContent)
    const endId = Number(el.querySelector("EndNodeId")?.textContent)

    const start = nodeMap.get(startId)
    const end = nodeMap.get(endId)

    if (!start || !end) return

    sectionMap.set(id, {
      id,
      start,
      end,
    })
  })

  const excavationMap = new Map<number, ExcavationType>()

  xml.querySelectorAll("Excavation").forEach((el) => {
    const id = Number(el.querySelector("Id")?.textContent)
    const sectionIds =
      el.querySelector("Sections")?.textContent
        ?.split(",")
        .map(Number) || []

    const sections = sectionIds
      .map((id) => sectionMap.get(id))
      .filter(Boolean) as SectionType[]
    excavationMap.set(id, {
      id,
      name: el.querySelector("Name")?.textContent || "",
      sections,
      visible: true,
    })
  })

  const horizons: HorizonType[] = []
  xml.querySelectorAll("Horizon").forEach((el) => {
    const id = Number(el.querySelector("Id")?.textContent)
    const sectionIds =
      el.querySelector("Sections")?.textContent
        ?.split(",")
        .map(Number) || []

    const sections = sectionIds
      .map((id) => sectionMap.get(id))
      .filter(Boolean) as SectionType[]

    horizons.push({
      id,
      name: el.querySelector("Name")?.textContent || "",
      sections,
    })
  })

  return {
    nodes: nodeMap,
    sections: sectionMap,
    excavations: excavationMap,
    horizons,
  }
}