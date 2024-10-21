import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'

function App() {
  //recordemos que vamos a leer las variables de local storage solamente en la inicializacion del estado
  //es decir, no lo ponemos fuera porque se ejecutaría cada vez que hubiera un nuevo render
  //y eso no seria optimo
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage? JSON.parse(boardFromLocalStorage) : 
    Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null) //null es que no hay ganador, y false un empate


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  

  const updateBoard = (index) => {
    //si hay algo ya en la casilla, no se puede volver a llenar
    if(board[index] || winner) return
    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //guardar la partida
    //tener en cuenta que esto funciona solamente porque se ejecuta del lado del cliente
    //si tuvieramos un servidor se accedería al localstorage del cliente de otra manera
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    //revisamos si luego de actualizar la casilla hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
      //aqui recordemos que react es asincrono, lo que quiere decir que no podemos pasar el valor anterior 
      //del ganador, esperando que lo lea como el valor actual
      //si quisieramos hacer alguna otra funcionalidad despues del "setWinner" con el valor nuevo, 
      //podriamos hacer una funcion de flecha(callback) dentro de la funcion "setWinner", en donde tambien tendriamos
      //acceso al valor del ganador anterior
      //ej: setWinner( (prevWinner) => {console.log(newWinner) return newWinner})
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (

    <main className='board'>
    <h1>Tic tac toe</h1>
    <button onClick={resetGame}> Reiniciar Juego</button>

    <section className='game'>
      {
        board.map((square, index)=>{
          return(
            <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
              {board[index]} 
              {/*o tambien se puede hacer :
              square*/}
            </Square>
          )
        })
      }
    </section>
    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>

    <WinnerModal winner={winner} resetGame={resetGame}/>
  </main>

  )
}

export default App
