export type NodeDto = {
  id: number
  x: number
  y: number
  z: number
}

export type SectionDto = {
  id: number
  startNodeId: number
  endNodeId: number
}

export type ExcavationDto = {
  id: number
  sectionIds: number[]
  name: string
}

export type HorizonDto = {
  id: number
  sectionIds: number[]
  name: string
}