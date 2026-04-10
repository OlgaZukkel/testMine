import {observer} from "mobx-react-lite";
import {DataType} from "@/shared/types.js";

const HorizonItem = observer(({horizon}: { horizon: DataType['horizons'][number] }) => {
  return (
    <div>
      <div>{horizon.name}</div>
      {horizon.excavations.map(e => (
        <div key={e.id}>{e.name}</div>
      ))}
    </div>
  )
})
export default HorizonItem;