import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: sessionStorage, // mustn't use local storage (default value) because it is not secure.
})

export const sampleState = atom({
  key: 'sampleState',
  default: '',
  effects_UNSTABLE: [persistAtom], // To persist states in browser refresh or screen transition.
})
