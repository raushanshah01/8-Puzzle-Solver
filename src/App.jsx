import React, { useState } from "react";
import PuzzleGrid from "./components/PuzzleGrid";
import Controls from "./components/Controls";
import "./App.css";

const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

function App() {
  const [board, setBoard] = useState([...goalState]);
  const [steps, setSteps] = useState([]);
  const [solving, setSolving] = useState(false);

  const shuffle = () => {
    let shuffled = [...board];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setBoard(shuffled);
    setSteps([]);
  };

  const onTileClick = (index) => {
    if (solving) return; // Disable during solving
    const emptyIndex = board.indexOf(0);
    const validMoves = getValidMoves(emptyIndex);
    if (validMoves.includes(index)) {
      const newBoard = [...board];
      [newBoard[emptyIndex], newBoard[index]] = [
        newBoard[index],
        newBoard[emptyIndex],
      ];
      setBoard(newBoard);
    }
  };

  const getValidMoves = (i) => {
    const moves = [];
    if (i - 3 >= 0) moves.push(i - 3);
    if (i + 3 < 9) moves.push(i + 3);
    if (i % 3 !== 0) moves.push(i - 1);
    if (i % 3 !== 2) moves.push(i + 1);
    return moves;
  };

  const solve = async () => {
    if (JSON.stringify(board) === JSON.stringify(goalState)) {
      alert("Already solved!");
      return;
    }

    setSolving(true);
    setSteps(["Starting BFS Search..."]);

    const queue = [[board]];
    const visited = new Set();
    visited.add(JSON.stringify(board));

    let solution = null;

    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];

      if (JSON.stringify(current) === JSON.stringify(goalState)) {
        solution = path;
        break;
      }

      const emptyIndex = current.indexOf(0);
      const moves = getValidMoves(emptyIndex);

      for (const move of moves) {
        const newBoard = [...current];
        [newBoard[emptyIndex], newBoard[move]] = [
          newBoard[move],
          newBoard[emptyIndex],
        ];

        const key = JSON.stringify(newBoard);
        if (!visited.has(key)) {
          visited.add(key);
          queue.push([...path, newBoard]);
        }
      }
    }

    if (solution) {
      setSteps((prev) => [
        ...prev,
        `✅ Solution found in ${solution.length - 1} moves.`,
        "Animating steps...",
      ]);

      for (let i = 0; i < solution.length; i++) {
        await new Promise((r) => setTimeout(r, 400));
        setBoard(solution[i]);
        setSteps((prev) => [
          ...prev,
          `Step ${i}: ${solution[i].join(", ")}`,
        ]);
      }

      setSteps((prev) => [...prev, "🎯 Puzzle Solved!"]);
    } else {
      setSteps((prev) => [...prev, "❌ No solution found!"]);
    }

    setSolving(false);
  };

  return (
    <div className="app-container">
      <div className="puzzle-section">
        <h1>🧩 8-Puzzle Solver </h1>
        <PuzzleGrid board={board} onTileClick={onTileClick} />
        <Controls shuffle={shuffle} solve={solve} />
      </div>

      <div className="steps-section">
        <h2>🪜Steps</h2>
        <div className="steps-box">
          {steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
