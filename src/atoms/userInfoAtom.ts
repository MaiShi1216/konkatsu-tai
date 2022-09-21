import { atom, RecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { UserInfoType } from '@/utils/types'

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: sessionStorage, // mustn't use local storage (default value) because it is not secure.
})

export const sampleState = atom({
  key: 'sampleState',
  default: '',
  effects_UNSTABLE: [persistAtom], // To persist states in browser refresh or screen transition.
})

export const userInfoState: RecoilState<UserInfoType> = atom({
  key: 'userInfoState',
  default: '',
  effects_UNSTABLE: [persistAtom],
})
