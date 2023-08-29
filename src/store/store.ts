import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface StoreState {
  fromLanguage: string
  toLanguage: string
  fromText: string
  result: string
  loading: boolean
  interchangeLanguages: () => void
  setFromLanguage: (value: string) => void
  setToLanguage: (value: string) => void
  setFromText: (value: string) => void
  setResult: (value: string) => void
}

export const useStore = create<StoreState>()(
  devtools((set, get) => ({
    fromLanguage: 'auto',
    toLanguage: '',
    fromText: '',
    result: '',
    loading: false,
    interchangeLanguages: () => {
      const { fromLanguage, toLanguage } = get()
      set({
        fromLanguage: toLanguage,
        toLanguage: fromLanguage
      })
    },
    setFromLanguage: value => {
      set({
        fromLanguage: value
      })
    },
    setToLanguage: value => {
      set({
        toLanguage: value
      })
    },
    setFromText: value => {
      set({
        loading: true,
        fromText: value,
        result: ''
      })
    },
    setResult: value => {
      set({
        loading: false,
        result: value
      })
    }
  }))
)
