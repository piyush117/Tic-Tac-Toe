import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx"; 
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js"; 

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
      if(gameTurns.length>0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
      }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }
  return gameBoard;
}

function deriveWinner(gameBoard, players){
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[firstSquare] ;
    }
  } 
  return winner;
}

function App() {
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players); 
  const draw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns];
      return updatedTurns; 
    })
  }

  function handlePlayerNameChange(playerSymbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [playerSymbol]: newName
      }
    });
  }

  return (
    <main id="display-row">
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>   
      </div>
      {(winner || draw) &&  <GameOver winner={winner}/>}
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
