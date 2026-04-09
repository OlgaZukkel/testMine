import {observer} from "mobx-react-lite"
import {Line, OrbitControls} from "@react-three/drei"
import {mineStore} from "@/app/store.js";
import {Canvas} from "@react-three/fiber"
import { useMemo} from "react";

export const MineScene = observer(() => {
  const {centerX, centerY, centerZ, scale} = useMemo(() => {
    let minX = Infinity
    let minY = Infinity
    let minZ = Infinity

    let maxX = -Infinity
    let maxY = -Infinity
    let maxZ = -Infinity

    mineStore.horizons.forEach((h) =>
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

    const sizeX = maxX - minX
    const sizeY = maxY - minY
    const sizeZ = maxZ - minZ

    const maxSize = Math.max(sizeX, sizeY, sizeZ)

    const scale = 100 / maxSize

    return {centerX, centerY, centerZ, scale}
  }, [mineStore.horizons.length]);

  const lines = useMemo(() => {
    return mineStore.horizons.flatMap((h) =>
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
  }, [mineStore.horizons, centerX, centerY, centerZ, scale]);

  return (
    <div className='w-full h-full'>
      <Canvas
        onLoad={() => {
          mineStore.setSceneReady(false)
        }}
        camera={{position: [0, 0, 150]}}>
        <ambientLight/>
        <OrbitControls/>
        {lines.map((line) => (
          <Line key={line.id} points={line.points} color="orange"/>
        ))}
      </Canvas>
    </div>
  )
})