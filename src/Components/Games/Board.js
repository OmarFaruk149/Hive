import React, { useState, useEffect } from "react";
import Square from "./Square";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [check, setCheck] = useState(true);
  const [status, setStatus] = useState("First player: X");
  const [won, setWon] = useState(false);
  const [draw, setDraw] = useState(false);

  const winnerCalculation = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [0, 4, 8],
      [2, 4, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWon(true);
        return squares[a];
      }
    }

    if (squares.every((square) => square !== null)) {
      setDraw(true);
    }

    return null;
  };

  useEffect(() => {
    let winner = winnerCalculation(squares);

    if (winner !== null) {
      setStatus("Winner is: " + winner);
      console.log("Congratulations!");
    } else if (draw) {
      setStatus("It's a draw!");
    }
  }, [squares, draw]);

  function handleClick(i) {
    const next = squares.slice();
    if (squares[i] !== null || won || draw) return;

    if (check) {
      next[i] = "X";
      setStatus("Next Player is: O");
    } else {
      next[i] = "O";
      setStatus("Next Player is: X");
    }

    setCheck(!check);
    setSquares(next);
  }

  return (
    <div className="flex items-center justify-center h-screen  login-form">
      <div className="bg-gray-300 rounded-lg p-2">
        <div className="p-1 text-center text-3xl font-semibold">Tik-Tak-Toe</div>
        <div className="flex p-3">
          <div className="p-1 ml-4 flex-1 font-semibold text-gray-800">{status}</div>
          <button
            className="mr-8 content-end rounded-lg bg-gray-400 hover:bg-gray-500 p-1"
            onClick={() => {
              setSquares(Array(9).fill(null));
              setWon(false);
              setDraw(false);
              setCheck(true);
              setStatus("First Player is: X");
            }}
          >
            Reset
          </button>
        </div>
        <div className="flex flex-row mx-8">
          <div>
            <Square value={squares[0]} onSquarClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquarClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquarClick={() => handleClick(2)} />
          </div>
          <div>
            <Square value={squares[3]} onSquarClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquarClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquarClick={() => handleClick(5)} />
          </div>
          <div>
            <Square value={squares[6]} onSquarClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquarClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquarClick={() => handleClick(8)} />
          </div>
        </div>
      </div>
    </div>
  );
}
