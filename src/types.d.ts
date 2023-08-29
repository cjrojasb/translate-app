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
