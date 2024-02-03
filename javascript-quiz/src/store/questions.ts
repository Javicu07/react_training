import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Question } from '../types.d'
import confetti from 'canvas-confetti'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

// leer como hacer 'middleware' en Zustand //

// 'persist' devuelve una función hay que tiparlo con '()' despues de '<State>'
export const useQuestionsStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch('http://localhost:5173/data.json')
      const json = await res.json()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      // con el método get(), es que podemos recuperar las 'questions', get() te devuelve el objeto
      // completo 'state', podemos acceder directo a 'questions' desestructurando
      const { questions } = get()
      // usando el structuredClone para hacer copia profunda
      const newQuestions = structuredClone(questions)
      // buscar el indice del Id, questionIndex
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      // recuperamos la información con el index
      const questionInfo = newQuestions[questionIndex]
      // verificamos si la opción elegida es la correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      if (isCorrectUserAnswer) confetti() // si es correcta lanzamos el confetti

      // cambiamos la información en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }

      // actualizamos el estado
      set({ questions: newQuestions })
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      // tenemos que verificar la cantidad de preguntas para ver si es posible ir a la siguiente
      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },

    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion })
      }
    },

    reset: () => {
      set({ currentQuestion: 0, questions: [] })
    }
  }
}, {
  name: 'questions'
}))
