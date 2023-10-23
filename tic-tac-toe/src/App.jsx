import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

import { TURNS } from './constants.js'

import { checkWinnerFrom, checkEndGame } from './logic/board.js'

import { WinnerModal } from './components/WinnerModal.jsx'

import { BoardGame } from './components/BoardGame.jsx'
import { TurnChange } from './components/TurnChange'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  
  const [turn, setTurn] = useState(TURNS.X)

  // 'null' --> no winner, 'false' --> tie
  const [winner, setWinner] = useState(null)
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    if ( board[index] || winner ) return //--> return if 'board[index]' contains a value

    // Update the board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // checking for winners
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return(
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>

      <BoardGame board={board} updateBoard={updateBoard}/>

      <TurnChange turn={turn} />

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
