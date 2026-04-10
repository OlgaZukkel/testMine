import {mineStore} from "@/app/store.js";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "components/ui/drawer.js";
import {DialogTitle} from "components/ui/dialog.js";
import {Description} from "@radix-ui/react-dialog";
import HorizonItem from "@/features/viewer/HorizonItem.js";
import {observer} from "mobx-react-lite";

const Menu = observer(() => {
  return (
    <Drawer direction={'left'}>
      <DrawerTrigger className={'p-4'}>Выработки</DrawerTrigger>
      <DrawerContent className='h-full w-[20rem] m-2'>
        <DialogTitle/>
        <Description/>
        <div className="">
          {mineStore.data?.horizons.map(h => (
            <HorizonItem key={h.id} horizon={h}/>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
})
export default Menu;