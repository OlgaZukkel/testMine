import React, { useEffect} from 'react';
import {MineScene} from "@/features/viewer/MineScene.js";
import {parseXml} from "@/features/parser/parseXml.js";
import {mineStore} from "@/app/store.js";
import Menu from "@/widgets/Menu.js";

const App = () => {
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/MIM_Scheme.xml")
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`)
        }
        const buffer = await res.arrayBuffer()
        const xmlText = new TextDecoder("windows-1251").decode(buffer)
        mineStore.setData(parseXml(xmlText))
      } catch (error) {
        console.error("Ошибка загрузки XML:", error)
      }
    })()
  }, [])

  return (
    <div className='flex h-full'>
        <Menu/>
        <MineScene/>
    </div>
  );
};

export default App;
