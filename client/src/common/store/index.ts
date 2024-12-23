import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { AuthSlice, createAuthSlice } from './auth-slice'

type Store = AuthSlice

export const useStore = create<Store>()(
  devtools(
    subscribeWithSelector(
      immer((...a) => ({
        ...createAuthSlice(...a),
      })),
    ),
  ),
)
