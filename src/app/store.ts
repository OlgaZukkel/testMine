import { makeAutoObservable } from "mobx"

class MineStore {
  horizons = []
  isSceneReady = true
  constructor() {
    makeAutoObservable(this)
  }
  setSceneReady(value: boolean) {
    this.isSceneReady = value
  }
  setData(data) {
    this.horizons = data.horizons
  }
}

export const mineStore = new MineStore()