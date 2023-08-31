import { useEffect } from 'react'
import { AUTO_LANGUAGE } from './constants'
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextFieldArea } from './components/TextFieldArea'
import { translate } from './services/translate'
import { useStore } from './store/store'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import useDebounce from './hooks/useDebounce'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

function App () {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()
  const debouncedValueText = useDebounce(fromText)

  const handleInterchangeLanguages = () => () => {
    interchangeLanguages()
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = toLanguage
    speechSynthesis.speak(utterance)
  }

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  useEffect(() => {
    if (debouncedValueText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedValueText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => {
        setResult('Error')
      })
  }, [debouncedValueText, fromLanguage, toLanguage])

  return (
    <main>
      <Container maxWidth='md'>
        <Stack
          direction='column'
          justifyContent='center'
          height='100vh'
          alignItems='center'
          gap={4}
        >
          <Typography variant='h2'>Google Translate</Typography>
          <Grid
            container
            alignItems='flex-start'
            justifyContent='center'
            gap={4}
          >
            <Grid item md={5}>
              <Stack direction='column' width='100%' gap={2}>
                <LanguageSelector
                  type={SectionType.From}
                  value={fromLanguage}
                  onChange={setFromLanguage}
                />
                <TextFieldArea
                  onChange={setFromText}
                  type={SectionType.From}
                  value={fromText}
                />
              </Stack>
            </Grid>
            <Grid
              item
              md={1}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <IconButton
                onClick={handleInterchangeLanguages()}
                disabled={fromLanguage === AUTO_LANGUAGE}
                sx={{ margin: '0 auto' }}
              >
                <SwapHorizIcon />
              </IconButton>
            </Grid>
            <Grid item md={5}>
              <Stack direction='column' gap={2}>
                <LanguageSelector
                  type={SectionType.To}
                  value={toLanguage}
                  onChange={setToLanguage}
                />
                <Box sx={{ position: 'relative' }}>
                  <TextFieldArea
                    loading={loading}
                    onChange={setResult}
                    type={SectionType.To}
                    value={result}
                  />
                  <Stack
                    display='flex'
                    gap={1}
                    direction='row'
                    sx={{ position: 'absolute', left: 5, bottom: 5 }}
                    p={1}
                  >
                    <IconButton onClick={handleSpeak}>
                      <VolumeUpIcon />
                    </IconButton>
                    <IconButton onClick={handleClipboard}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </main>
  )
}

export default App
