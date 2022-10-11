import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const tokenState = atom<string>({ key: 'TOKEN', default: '', effects_UNSTABLE: [persistAtom] })
