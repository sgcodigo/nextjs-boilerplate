import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const persistAtomEffect: AtomEffect<any> = param => {
    param.getPromise(isClientSideState).then(() => persistAtom(param))
  }
  
export const isClientSideState = atom({ key: 'client-side', default: false })

export const tokenState = atom<string>({ key: 'TOKEN', default: '', effects_UNSTABLE: [persistAtom] })
