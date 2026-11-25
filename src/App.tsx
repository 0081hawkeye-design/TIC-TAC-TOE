import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Block from "./components/Block";
import { useState } from "react";

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");

  const checkWinner = (state: any[]) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 5, 6],
    ];

    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c])
        return true;
    }
    return false;
  };

  const handleBlockClick = (index: number) => {
    const stateCopy = Array.from(state);
    if (stateCopy[index] !== null) return;
    stateCopy[index] = currentTurn;

    // check if someone wins
    const win = checkWinner(stateCopy);

    if (win) {
      alert(`${currentTurn} won the game`);
    }

    setCurrentTurn(currentTurn === "X" ? "0" : "X");
    setState(stateCopy);
  };

  console.log(state);

  return (
    <div className="board">
      <div className="row">
        <Block onclick={() => handleBlockClick(0)} value={state[0]} />
        <Block onclick={() => handleBlockClick(1)} value={state[1]} />
        <Block onclick={() => handleBlockClick(2)} value={state[2]} />
      </div>

      <div className="row">
        <Block onclick={() => handleBlockClick(3)} value={state[3]} />
        <Block onclick={() => handleBlockClick(4)} value={state[4]} />
        <Block onclick={() => handleBlockClick(5)} value={state[5]} />
      </div>

      <div className="row">
        <Block onclick={() => handleBlockClick(6)} value={state[6]} />
        <Block onclick={() => handleBlockClick(7)} value={state[7]} />
        <Block onclick={() => handleBlockClick(8)} value={state[8]} />
      </div>
    </div>
  );
}

export default App;
