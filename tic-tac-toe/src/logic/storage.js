export const saveGameToStorage = ({ board, turn}) => {
  window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}