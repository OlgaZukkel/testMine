export type NodeDto = {
  id: number
  x: number
  y: number
  z: number
}

export type SectionDto = {
  id: number
  start: NodeDto
  end: NodeDto
}

export type ExcavationDto = {
  key: number
  value: {
    id: number
    sections: {
      id: number
      end: NodeDto
      start: NodeDto
    }
    visible: boolean
    name: string

  }
}
export type HorizonDto = {
  id: number
  excavations: {
    id: number
    name: string
    sections: {
      id: number
      end: NodeDto
      start: NodeDto
    }[]
    visible: boolean
  }[]
  name: string
}
export type LinesType = {
  id: number
  points: number[][]
}[]

export type DataType = {
  excavations: ExcavationDto[]
  horizons: HorizonDto[]
  nodes: {
    key: number
    value: NodeDto
  }[]
  sections: {
    key: number
    value: SectionDto
  }[]
}
export type MineData = {
  nodes: Map<number, Node>
  sections: Map<number, SectionDto>
  excavations: Map<number, ExcavationDto>
  horizons: HorizonDto[]
}