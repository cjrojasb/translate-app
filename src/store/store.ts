import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { type FromLanguage, type Language } from '../types.d'
import { AUTO_LANGUAGE } from '../constants'

interface StoreState {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
  interchangeLanguages: () => void
  setFromLanguage: (value: FromLanguage) => void
  setToLanguage: (value: Language) => void
  setFromText: (value: string) => void
  setResult: (value: string) => void
}

export const useStore = create<StoreState>()(
  devtools((set, get) => ({
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false,
    interchangeLanguages: () => {
      const { fromLanguage, toLanguage } = get()
      if (fromLanguage === AUTO_LANGUAGE) {
        return
      }
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
