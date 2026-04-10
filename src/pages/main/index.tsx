import {memo, } from "react";
import {Canvas} from "@react-three/fiber";
import {Line, OrbitControls} from "@react-three/drei";
import {useMine} from "hooks/useMine.js";

const MineScene = memo(() => {
  const {horizons, lines} = useMine();

  if (!horizons?.length) {
    return null
  }
  return (
    <div className='w-full h-full'>
      <Canvas
        camera={{position: [0, 0, 150]}}>
        <ambientLight/>
        <OrbitControls/>
        {lines?.map((line) => (
          <Line key={line.id} points={line.points} color="orange"/>
        ))}
      </Canvas>
    </div>
  )
})
export default MineScene

