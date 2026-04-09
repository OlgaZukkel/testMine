import {createMonoHook, useLazyFetch} from 'use-mono-hook'
import {useEffect, useState} from 'react'
import {mockFunction} from '@/utils/mockFunction.js'
import {useBounds} from "@react-three/drei";

const _useMine = () => {
  const [horizons, setHorizons] = useState<any[]>([])
  return {
    horizons,
    setHorizons
  }
}

export const useMine = createMonoHook<typeof _useMine>(_useMine, {
  defaults: {
    horizons: undefined,
    setHorizons: mockFunction
  },
}).useHook
