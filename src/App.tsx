import {
  memo,
} from 'react'
import {MonoHooksStore} from 'use-mono-hook'
import MineScene from "pages/main/index.js";
import Menu from "components/Menu.js";


const App = memo(() => {

  return (
    <>
      <Menu/>
      <MineScene/>
      <MonoHooksStore/>
    </>
  )
})

export default App
