import React from "react";
import "./PuzzleGrid.css"; // We'll keep this for sizing

const PuzzleGrid = ({ board, onTileClick }) => {
  return (
    <div className="puzzle-grid">
      {board.map((tile, i) => (
        <div
          key={i}
          className={`tile rounded shadow-sm ${
            tile === 0 ? "empty" : "bg-primary text-white"
          }`}
          onClick={() => onTileClick(i)}
        >
          {tile !== 0 && tile}
        </div>
      ))}
    </div>
  );
};

export default PuzzleGrid;