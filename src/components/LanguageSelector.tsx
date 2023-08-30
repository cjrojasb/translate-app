import { MenuItem, TextField } from '@mui/material'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { type FC } from 'react'
import { SectionType, type FromLanguage, type Language } from '../types.d'
import { useStore } from '../store/store'

type Props =
  | {
    type: SectionType.From
    value: FromLanguage
    onChange: (language: FromLanguage) => void
  }
  | {
    type: SectionType.To
    value: Language
    onChange: (language: Language) => void
  }

export const LanguageSelector: FC<Props> = ({ type, value, onChange }) => {
  const { fromLanguage, toLanguage } = useStore()

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value as Language
    onChange(value)
  }

  return (
    <TextField
      fullWidth
      onChange={handleChange}
      select
      value={value}
      variant='outlined'
    >
      {type === SectionType.From && (
        <MenuItem value={AUTO_LANGUAGE}>Detectar idioma</MenuItem>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <MenuItem
          key={key}
          value={key}
          disabled={key === fromLanguage || key === toLanguage}
        >
          {literal}
        </MenuItem>
      ))}
    </TextField>
  )
}
