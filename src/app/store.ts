import {makeAutoObservable} from "mobx"
import {LineType, MineData} from "@/shared/types.js";

class MineStore {
  data: MineData | null = null
  lines: LineType[] = []
  bounds = null
  visibleHorizons = new Set<number>()

  constructor() {
    makeAutoObservable(this)
  }

  get vertices() {
    const result: number[] = []
    this.lines.forEach((line) => {
      const [p1, p2] = line.points
      result.push(...p1, ...p2)
    })
    return new Float32Array(result)
  }

  setData(data: MineData) {
    this.data = data
    this.visibleHorizons.clear()
    data.horizons.forEach(h => {
      this.visibleHorizons.add(h.id)
    })
    this.compute()
  }

  toggleHorizon(id: number) {
    if (this.visibleHorizons.has(id)) {
      this.visibleHorizons.delete(id)
    } else {
      this.visibleHorizons.add(id)
    }

    this.compute()
  }

  compute() {
    if (!this.data) return

    let minX = Infinity, minY = Infinity, minZ = Infinity
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity

    const lines: any[] = []
    this.data.horizons.forEach((h) => {
      if (!this.visibleHorizons.has(h.id)) return

      h.sections.forEach((s) => {
        minX = Math.min(minX, s.start.x, s.end.x)
        minY = Math.min(minY, s.start.y, s.end.y)
        minZ = Math.min(minZ, s.start.z, s.end.z)

        maxX = Math.max(maxX, s.start.x, s.end.x)
        maxY = Math.max(maxY, s.start.y, s.end.y)
        maxZ = Math.max(maxZ, s.start.z, s.end.z)
      })
    })

    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2
    const centerZ = (minZ + maxZ) / 2

    const maxSize = Math.max(
      maxX - minX,
      maxY - minY,
      maxZ - minZ
    )
    const scale = maxSize ? 100 / maxSize : 1
    this.data.horizons.forEach((h) => {
      if (!this.visibleHorizons.has(h.id)) return
      h.sections.forEach((s) => {
        lines.push({
          id: s.id,
          points: [
            [
              (s.start.x - centerX) * scale,
              (s.start.y - centerY) * scale,
              (s.start.z - centerZ) * scale,
            ],
            [
              (s.end.x - centerX) * scale,
              (s.end.y - centerY) * scale,
              (s.end.z - centerZ) * scale,
            ],
          ],
        })
      })
    })

    this.bounds = {centerX, centerY, centerZ, scale}
    this.lines = lines
  }
}

export const mineStore = new MineStore()