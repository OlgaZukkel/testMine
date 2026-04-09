import React, {memo, useEffect} from 'react';
import {MineScene} from "@/features/viewer/MineScene.js";
import {parseXml} from "@/features/parser/parseXml.js";
import {mineStore} from "@/app/store.js";
import {Menu} from "@/widgets/Menu.js";
import {Spinner} from "components/ui/spinner.js";

const App = memo(() => {
  useEffect(() => {
    (async () => {
      const res = await fetch("/MIM_Scheme.xml")
      const buffer = await res.arrayBuffer()

      const decoder = new TextDecoder("windows-1251")
      const xmlText = decoder.decode(buffer)

      const data = parseXml(xmlText)
      mineStore.setData(data)
    })()
  }, []);

  return (
    <>
      {!mineStore.isSceneReady ? <Spinner /> :   <>
        <Menu />
        <MineScene />
      </>}


    </>
  );
});

export default App;
