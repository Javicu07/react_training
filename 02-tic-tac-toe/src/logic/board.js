import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardToCheck) => {
  // Review of all winner combinations
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  // no winner
  return null
}

export const checkEndGame = (newBoard) => {
  return newBoard.every(square => square !== null)
}
