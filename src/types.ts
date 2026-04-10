export type NodeType = {
  id: number
  x: number
  y: number
  z: number
}

export type SectionType = {
  id: number
  start: NodeType
  end: NodeType
}

export type ExcavationType = {
  id: number
  name: string
  sections: SectionType[]
  visible: boolean
}

export type HorizonType = {
  id: number
  name: string
  sections: SectionType[]
}