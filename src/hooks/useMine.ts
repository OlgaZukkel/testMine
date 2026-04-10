import {createMonoHook, useLazyFetch} from 'use-mono-hook'
import {useEffect, useMemo, useState} from 'react'
import {mockFunction} from '@/utils/mockFunction.js'
import {useBounds} from "@react-three/drei";
import {parseXml} from "utils/parseXml.js";

const _useMine = () => {
  const [horizons, setHorizons] = useState<any[]>([])
  const {centerX, centerY, centerZ, scale} = useMemo(() => {
    if (!horizons?.length) return {
      centerX: 0,
      centerY: 0,
      centerZ: 0,
      scale: 1,
    }
    let minX = Infinity, minY = Infinity, minZ = Infinity
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity

    horizons.forEach((h) =>
      h.sections.forEach((s) => {
        minX = Math.min(minX, s.start.x, s.end.x)
        minY = Math.min(minY, s.start.y, s.end.y)
        minZ = Math.min(minZ, s.start.z, s.end.z)

        maxX = Math.max(maxX, s.start.x, s.end.x)
        maxY = Math.max(maxY, s.start.y, s.end.y)
        maxZ = Math.max(maxZ, s.start.z, s.end.z)
      })
    )

    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2
    const centerZ = (minZ + maxZ) / 2

    const maxSize = Math.max(
      maxX - minX,
      maxY - minY,
      maxZ - minZ
    )

    const scale = 100 / maxSize

    return {centerX, centerY, centerZ, scale}
  }, [horizons]);

  const lines = useMemo(() => {
    if (!horizons?.length) return []
    return horizons.flatMap((h) =>
      h.sections.map((s) => ({
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
      }))
    )
  }, [horizons, centerX, centerY, centerZ, scale]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/MIM_Scheme.xml")
      const buffer = await res.arrayBuffer()
      const decoder = new TextDecoder("windows-1251")
      const xmlText = decoder.decode(buffer)
      const data = parseXml(xmlText)
      setHorizons(data.horizons)
    })()
  }, []);

  return {
    horizons,
    setHorizons,
    lines
  }
}

export const useMine = createMonoHook<typeof _useMine>(_useMine, {
  defaults: {
    horizons: undefined,
    setHorizons: mockFunction,
    lines: undefined,
  },
}).useHook
