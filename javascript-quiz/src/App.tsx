import './App.css'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Container, Stack, Typography } from '@mui/material'
import { Start } from './Start'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App () {
  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            Javascript Quiz
          </Typography>
        </Stack>

        <Start />

      </Container>
    </main>
  )
}

export default App
