import './App.css'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Container, Stack, Typography } from '@mui/material'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './Game'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App () {
  const questions = useQuestionsStore(state => state.questions)

  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            Javascript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}

      </Container>
    </main>
  )
}

export default App
