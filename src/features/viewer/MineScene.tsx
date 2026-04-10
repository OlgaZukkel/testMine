import { OrbitControls} from "@react-three/drei"
import {Canvas} from "@react-three/fiber"
import Lines from "@/features/viewer/Lines.js";
import {observer} from "mobx-react-lite";

export const MineScene = observer(() => {

  return (
    <div className='w-full h-full'>
      <Canvas
        camera={{position: [0, 0, 150]}}>
        <ambientLight/>
        <OrbitControls/>
        <Lines />
      </Canvas>
    </div>
  )
})