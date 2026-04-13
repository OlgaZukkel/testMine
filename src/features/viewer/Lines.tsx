import {observer} from "mobx-react-lite";
import {mineStore} from "@/app/store.js";

const Lines = observer(() => {
  const vertices = mineStore.vertices
  if (!vertices.length) return null
  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={vertices}
          count={vertices.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="orange" />
    </lineSegments>
  )
})
export default Lines