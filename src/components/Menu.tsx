import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "components/ui/drawer.js";
import {DialogTitle} from "components/ui/dialog.js";
import {Description} from "@radix-ui/react-dialog";
import {memo} from "react";
import {useMine} from "hooks/useMine.js";

 const Menu = memo(() => {
   const {horizons} = useMine()
  return (
    <Drawer direction={'left'}>
      <DrawerTrigger className={'p-4'}>Выработки</DrawerTrigger>
      <DrawerContent className='h-full w-[20rem] m-2 pt-4'>
        <DialogTitle/>
        <Description/>
        <div className="">
          {horizons?.map((h) => (
            <div key={h.id} className="horizon ">
              <div className="title">{h.name}</div>
              {h.excavations?.map((e) => (
                <div key={e.id} className="">
                  <label>
                    {e.name}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
})
export default Menu