import {
  memo,
} from 'react'
import {MonoHooksStore} from 'use-mono-hook'
import MainPage from "pages/main/index.js";



const App = memo(() => {

  return (
    <>
      <MainPage/>
      <MonoHooksStore/>
    </>
  )
})

export default App
