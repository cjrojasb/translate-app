import { useStore } from './store/store'
import { Button } from '@mui/material'

function App () {
  const fromLanguage = useStore(state => state.fromLanguage)
  const setFromLanguage = useStore(state => state.setFromLanguage)

  const handleFromLanguage = (language: string) => () => {
    setFromLanguage(language)
  }
  return (
    <div className='app'>
      <h1>Google Translate</h1>
      {fromLanguage}
      <Button onClick={handleFromLanguage('ES')}>Cambiar Idioma</Button>
    </div>
  )
}

export default App
