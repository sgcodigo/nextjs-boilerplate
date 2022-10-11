import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { Popup } from '../types';

const { persistAtom } = recoilPersist();

<<<<<<< HEAD
export const popupState = atom<Popup>({ key: 'POPUP', default: {} });

export const tokenState = atom<string>({ key: 'TOKEN', default: '', effects_UNSTABLE: [persistAtom] });
=======
export const tokenState = atom<string>({ key: 'TOKEN', default: '', effects_UNSTABLE: [persistAtom] })
>>>>>>> main
