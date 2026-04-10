import {observer} from "mobx-react-lite";
import {Line} from "@react-three/drei";
import {mineStore} from "@/app/store.js";

const Lines = observer(() => {
  return (
    <>
      {mineStore.lines.map((line) => (
        <Line key={line.id} points={line.points} color="orange"/>
      ))}
    </>
  )
})
export default Lines