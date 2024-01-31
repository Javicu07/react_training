// import { IconButton, Stack } from "@mui/material"
import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { type Question as QuestionType } from './types.d'
import { useQuestionsStore } from './store/questions'
import SyntaxHighLighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

// al dejarla fuera del componente se crea una vez la función
const getBackgroundColor = (index: number, info: QuestionType) => {
  const { userSelectedAnswer, correctAnswer } = info
  // usuario no ha seleccionado nada todavía
  if (userSelectedAnswer == null) return 'transparent'
  // si ya seleccionó pero es INCORRECTA
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
  // si es la solución correcta
  if (index === correctAnswer) return 'green'
  // si esta es la solución del usuario pero no es correcta
  if (index === userSelectedAnswer && index !== correctAnswer) return 'red'
  // si no es ninguna de las anteriores
  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  // creamos una función que a su vez devuelve una función que va a ser el handleClick
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 3 }}>

      <Typography variant='h5'>
        {info.question}
      </Typography>

      <SyntaxHighLighter language='Javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighLighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(index, info)
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />

      <Footer />
    </>
  )
}
