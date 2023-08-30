import { type FC } from 'react'
import { TextField } from '@mui/material'
import { SectionType } from '../types.d'

interface Props {
  loading?: boolean
  onChange: (value: string) => void
  type: SectionType
  value: string
}

const getPlaceholder = ({
  type,
  loading
}: {
  type: SectionType
  loading?: boolean
}): string => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextFieldArea: FC<Props> = ({
  loading,
  onChange,
  type,
  value
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value
    onChange(value)
  }

  return (
    <TextField
      autoFocus={type === SectionType.From}
      disabled={loading}
      multiline
      onChange={handleChange}
      placeholder={getPlaceholder({ type, loading })}
      rows={5}
      value={value}
    />
  )
}
