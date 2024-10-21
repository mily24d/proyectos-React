import { WINNER_COMBOS } from '../constants'

export const checkWinnerFrom = (boardToCheck) => {
    //revisamos todas las combinaciones posible para ganar y si alguna se cumple
    //retornamos un ganador
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo

      if(boardToCheck[a] && 
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a]
      }
    }

    return null
}


export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square != null)
}