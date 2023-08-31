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
      const { fromLanguage, toLanguage, fromText } = get()
      if (fromLanguage === AUTO_LANGUAGE) return
      const loading = fromText !== ''

      set({
        fromLanguage: toLanguage,
        toLanguage: fromLanguage,
        loading,
        result: ''
      })
    },
    setFromLanguage: value => {
      const { fromLanguage, fromText } = get()
      if (fromLanguage === value) return
      const loading = fromText !== ''

      set({
        fromLanguage: value,
        result: '',
        loading
      })
    },
    setToLanguage: value => {
      const { toLanguage, fromText } = get()
      if (toLanguage === value) return
      const loading = fromText !== ''

      set({
        toLanguage: value,
        result: '',
        loading
      })
    },
    setFromText: value => {
      const loading = value !== ''

      set({
        loading,
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
