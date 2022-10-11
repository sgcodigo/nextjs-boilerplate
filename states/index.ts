import { atom } from 'recoil'
import { Popup } from '../types'

export const popupState = atom<Popup>({ key: 'POPUP', default: {} })
