import { useStore } from './store/store'
import { IconButton, Container, Typography, Stack, Grid } from '@mui/material'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { AUTO_LANGUAGE } from './constants'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextFieldArea } from './components/TextFieldArea'

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

  const handleInterchangeLanguages = () => () => {
    interchangeLanguages()
  }
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
          <Grid container alignItems='center' justifyContent='center' gap={4}>
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
                <TextFieldArea
                  loading={loading}
                  onChange={setResult}
                  type={SectionType.To}
                  value={result}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </main>
  )
}

export default App
