import React, { useState, useEffect } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, onPlay, xIsNext, isVsComputer }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const isDraw = squares.every((square) => square !== null) && !winner;

  let status;
  if (winner) {
    status = `Ganador: ${winner}`;
  } else if (isDraw) {
    status = 'Empate';
  } else {
    status = `Siguiente jugador: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getComputerMove(squares) {
  const emptySquares = squares
    .map((val, index) => (val === null ? index : null))
    .filter((val) => val !== null);
  
  if (emptySquares.length > 0) {
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }
  return null;
}

function Game({ isVsComputer }) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  useEffect(() => {
    if (!xIsNext && isVsComputer && !calculateWinner(currentSquares)) {
      const computerMove = getComputerMove(currentSquares);
      if (computerMove !== null) {
        setTimeout(() => {
          handlePlay(
            currentSquares.map((val, index) =>
              index === computerMove ? 'O' : val
            )
          );
        }, 500);
      }
    }
  }, [xIsNext, isVsComputer, currentSquares]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  useEffect(() => {
    if (calculateWinner(currentSquares) || currentSquares.every((sq) => sq !== null)) {
      setTimeout(restartGame, 2000);
    }
  }, [currentSquares]);

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onPlay={handlePlay} xIsNext={xIsNext} isVsComputer={isVsComputer} />
      </div>
    </div>
  );
}

function TicTacToe() {
  const [isVsComputer, setIsVsComputer] = useState(false);

  return (
    <div className="App">
      <h1>Tres en Línea</h1>
      <button className="btn-vs" onClick={() => setIsVsComputer(!isVsComputer)}>
        {isVsComputer ? 'Modo: Jugador vs Jugador' : 'Modo: VS Computadora'}
      </button>
      <Game isVsComputer={isVsComputer} />
    </div>
  );
}

export default TicTacToe;
