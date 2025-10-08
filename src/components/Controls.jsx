import React from "react";

const Controls = ({ shuffle, solve }) => {
  return (
    <div className="mt-4 text-center">
      <button className="btn btn-primary me-2" onClick={shuffle}>
        Shuffle
      </button>
      <button className="btn btn-success" onClick={solve}>
        Solve 
      </button>
    </div>
  );
};

export default Controls;