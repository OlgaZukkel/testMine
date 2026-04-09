import {memo, useEffect, useMemo} from "react";
import {Canvas} from "@react-three/fiber";
import {Line, OrbitControls} from "@react-three/drei";
import {useMine} from "hooks/useMine.js";

 const MineScene = memo(() => {
   const { horizons } = useMine()

   const { centerX, centerY, centerZ, scale } = useMemo(() => {
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

     return { centerX, centerY, centerZ, scale }
   }, [horizons])

   const lines = useMemo(() => {
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
   }, [horizons, centerX, centerY, centerZ, scale])



  return (
    <div className='w-full h-full'>
      <Canvas
        onLoad={() => {
          // mineStore.setSceneReady(false)
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
export default MineScene

