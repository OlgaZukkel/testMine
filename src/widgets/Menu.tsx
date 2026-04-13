import {mineStore} from "@/app/store.js";
import {observer} from "mobx-react-lite";

const Menu = observer(() => {
  return (
    <div className="max-h-screen overflow-y-auto p-4">
      {mineStore.data?.horizons.map(h => (
        <div key={h.id} className='flex gap-2 items-center'>
          <input
            type="checkbox"
            checked={mineStore.visibleHorizons.has(h.id)}
            onChange={() => mineStore.toggleHorizon(h.id)}
          />
          <div>{h.name}</div>
        </div>
      ))}
    </div>
  )
})
export default Menu;