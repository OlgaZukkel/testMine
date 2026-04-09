import {
  memo, useEffect,
} from 'react'
import {MonoHooksStore} from 'use-mono-hook'
import MineScene from "pages/main/index.js";
import {useMine} from "hooks/useMine.js";


const App = memo(() => {
  const {setHorizons} = useMine()

  useEffect(() => {
    (async () => {
      const res = await fetch("/MIM_Scheme.xml")
      const buffer = await res.arrayBuffer()
      const decoder = new TextDecoder("windows-1251")
      const xmlText = decoder.decode(buffer)
      setTimeout(() => {
        const data = parseXml(xmlText)
        setHorizons(data.horizons)
      }, 0)
    })()
  }, [])
  return (
    <>
      <MineScene/>
      <MonoHooksStore/>
    </>
  )
})

export default App
