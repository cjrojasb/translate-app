import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from './constants'

export interface StoreState {
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

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage
export enum SectionType {
  From = 'from',
  To = 'to'
}
