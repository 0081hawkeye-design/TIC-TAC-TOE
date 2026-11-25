import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Block from "./components/Block";

type Player = "X" | "O";
type Cell = Player | null;
type Mode = "friend" | "computer";

// all 8 ways to win (3 rows, 3 columns, 2 diagonals)
const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

// check the board: did someone win? returns the player + the winning squares
const getWinner = (board: Cell[]) => {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a] as Player, line: [a, b, c] };
    }
  }
  return null;
};

// simple computer brain: win > block > center > random
const pickComputerMove = (board: Cell[]): number => {
  const empty = board.map((v, i) => (v === null ? i : -1)).filter((i) => i >= 0);
  // find a square where "p" would win right now
  const findWin = (p: Player) =>
    empty.find((i) => {
      const copy = [...board];
      copy[i] = p;
      return getWinner(copy) !== null;
    });
  const win = findWin("O");
  if (win !== undefined) return win; // 1. win if I can
  const block = findWin("X");
  if (block !== undefined) return block; // 2. stop the human from winning
  if (board[4] === null) return 4; // 3. take the center
  return empty[Math.floor(Math.random() * empty.length)]; // 4. anything else
};

const App: React.FC = () => {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null)); // 9 empty squares
  const [turn, setTurn] = useState<Player>("X"); // X always starts
  const [mode, setMode] = useState<Mode>("friend");
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const result = getWinner(board); // null if nobody won yet
  const isDraw = !result && board.every((c) => c !== null);
  const gameOver = result !== null || isDraw;
  const computerThinking = mode === "computer" && turn === "O" && !gameOver;

  // place a mark on square "i" for the current player
  const play = useCallback(
    (i: number) => {
      if (board[i] || getWinner(board)) return; // ignore filled squares / finished game
      const next = [...board];
      next[i] = turn;
      const w = getWinner(next);
      setBoard(next);
      if (w) {
        setScores((s) => ({ ...s, [w.player]: s[w.player] + 1 })); // +1 for winner
      } else if (next.every((c) => c !== null)) {
        setScores((s) => ({ ...s, draws: s.draws + 1 })); // +1 draw
      } else {
        setTurn(turn === "X" ? "O" : "X"); // pass the turn
      }
    },
    [board, turn]
  );

  // when it's the computer's turn, wait a bit and then play
  useEffect(() => {
    if (!computerThinking) return;
    const timer = setTimeout(() => play(pickComputerMove(board)), 600);
    return () => clearTimeout(timer); // cleanup if things change
  }, [computerThinking, board, play]);

  // new round: clear board, keep scores
  const nextRound = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
  };

  // switch mode: fresh board + fresh scores
  const changeMode = (m: Mode) => {
    setMode(m);
    setScores({ X: 0, O: 0, draws: 0 });
    nextRound();
  };

  // names shown in the UI
  const nameOf = (p: Player) => (mode === "computer" && p === "O" ? "Computer" : `Player ${p}`);

  // the message under the board
  let status = `${nameOf(turn)}'s turn`;
  if (computerThinking) status = "Computer is thinking...";
  if (result) status = `${nameOf(result.player)} wins! 🎉`;
  if (isDraw) status = "It's a draw! 🤝";

  return (
    <div className="app">
      <h1 className="title">
        <span className="tx">Tic</span> <span className="tm">Tac</span> <span className="to">Toe</span>
      </h1>

      {/* mode switch */}
      <div className="modes">
        <button className={mode === "friend" ? "active" : ""} onClick={() => changeMode("friend")}>
          👫 vs Friend
        </button>
        <button className={mode === "computer" ? "active" : ""} onClick={() => changeMode("computer")}>
          🤖 vs Computer
        </button>
      </div>

      {/* scoreboard: the active player's card glows */}
      <div className="scoreboard">
        <div className={`score x ${!gameOver && turn === "X" ? "active" : ""}`}>
          <span>{nameOf("X")}</span>
          <strong>{scores.X}</strong>
        </div>
        <div className="score draw">
          <span>Draws</span>
          <strong>{scores.draws}</strong>
        </div>
        <div className={`score o ${!gameOver && turn === "O" ? "active" : ""}`}>
          <span>{nameOf("O")}</span>
          <strong>{scores.O}</strong>
        </div>
      </div>

      {/* the board: 9 squares */}
      <div className="board">
        {board.map((value, i) => (
          <Block
            key={i}
            value={value}
            onClick={() => play(i)}
            isWinning={result ? result.line.includes(i) : false}
            disabled={gameOver || computerThinking || value !== null}
            label={`Square ${i + 1}, ${value ?? "empty"}`}
          />
        ))}
      </div>

      <p className={`status ${result ? `won ${result.player}` : ""}`}>{status}</p>

      <div className="actions">
        <button className="primary" onClick={nextRound}>
          {gameOver ? "Play again" : "Restart round"}
        </button>
        <button onClick={() => setScores({ X: 0, O: 0, draws: 0 })}>Reset scores</button>
      </div>

      {/* confetti rain when someone wins (pure CSS, no library) */}
      {result && (
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 40 }).map((_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 10) * 0.12}s`,
                background: ["#22d3ee", "#f472b6", "#fbbf24", "#a78bfa"][i % 4],
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;