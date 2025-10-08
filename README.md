# 8-Puzzle Solver (React + Vite)

A small, educational React application that demonstrates breadth-first search (BFS) and A* search to solve the classic 8-puzzle sliding-tile problem. The app is built with Vite and React, and includes a simple visual board, controls to shuffle and solve the puzzle, and a step-by-step animation of the solution.

This repository is intended for learners and developers who want a compact, readable implementation of search algorithms applied to a toy puzzle, suitable for experimentation, learning, or small demos.

## Table of Contents

- Project overview
- Features
- Demo / Screenshots
- Getting started
	- Prerequisites
	- Install
	- Run (development)
	- Build (production)
- Usage
	- Interacting with the UI
	- How the solver works
- Project structure
- Algorithms and utilities
- Tests (notes)
- Contributing
- License
- Acknowledgements

## Project overview

The 8-puzzle consists of a 3x3 grid containing eight numbered tiles and one empty space. The goal is to reach the target configuration (1–8 with the empty tile at the end) using a series of legal moves (sliding a tile into the empty space).

This project shows how to implement two classic graph search strategies to solve the puzzle:

- Breadth-First Search (BFS) — guaranteed to find the shortest (minimum-move) solution but can be memory intensive.
- A* Search (A-star) with Manhattan distance heuristic — usually faster and more memory efficient than BFS for this puzzle when the heuristic is admissible.

Both algorithms are implemented in `src/algorithms/search.js` and are wired into a minimal React UI in `src/App.jsx`.

## Features

- Interactive 3x3 puzzle board with click-to-move tiles.
- Shuffle the board to produce a random starting position.
- Solve the puzzle automatically and animate the solution steps.
- Step log that shows solver progress and the list of intermediate states.
- Clean, small codebase intended for learning and experimentation.

## Tech Stack

- React (UI) — component-based UI for the puzzle and controls.
- Vite (dev server & bundling) — fast HMR and build tool.
- JavaScript (ESModules) — implementation language for algorithms and UI.
- CSS — basic styling for the grid and layout.

This project keeps dependencies minimal on purpose so the core algorithms remain easy to read and modify.

## How to Play / Use

Using the web UI:

1. Run the dev server with `npm run dev` and open the local URL in your browser.
2. The left panel shows the 3x3 puzzle. The empty tile is displayed as a blank (or styled differently).
3. Click any tile adjacent to the empty space to slide it into the empty spot.
4. Click `Shuffle` to randomize the board. Note: the shuffle is purely random and may produce unsolvable states.
5. Click `Solve` to run the solver from the current state. The UI uses BFS by default and will animate the sequence of moves when a solution is found. The step log on the right shows messages and each board state as the solver progresses.

Programmatic usage:

- Import the solver functions from `src/algorithms/search.js` (see the `Example` section for a working snippet). Useful for automated experimentation or adding new UI controls.

Tips:

- Prefer small scrambles while experimenting with BFS — BFS can be slow or memory-intensive on harder scrambles.
- To always get solvable shuffles, implement an inversion parity check or generate shuffles by applying random legal moves from the solved state.

## Demo / Screenshots

Open `index.html` after running the dev server (see below) to see the app. The UI contains two main panels: the puzzle on the left and a step log on the right.

## Getting started

### Prerequisites

- Node.js (v14+ recommended) and npm (or pnpm/yarn). On Windows, ensure your shell is a recent PowerShell or the Windows Terminal.

### Install

From the project root, install dependencies:

```powershell
npm install
```

### Run (development)

Start the Vite dev server:

```powershell
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173) in your browser.

### Build (production)

To create an optimized production build:

```powershell
npm run build
```

Serve the `dist` folder with any static server or deploy to a static hosting provider.

## Usage

- Shuffle: randomizes the board (note: not all random permutations of the 8-puzzle are solvable; the UI does not currently ensure only solvable shuffles).
- Solve: starts the solver (BFS in the UI code). The solver will enqueue states and, when a solution is found, animate the board through each step with a short delay.
- Click tiles: you may also manually move tiles by clicking them — legal moves (adjacent to the empty space) will slide.

## How the solver works (short)

The app currently performs a breadth-first search (BFS) starting from the current board configuration and searching until it finds the goal state. The BFS uses a queue of paths and a `Set` of visited states (stringified arrays) to avoid revisiting states. Once a path to the goal is found, the app animates each board state with a delay to show the solution.

The repository also contains an A* implementation in `src/algorithms/search.js` which uses a Manhattan distance heuristic; this is not currently wired into the UI by default but can be easily integrated.

Algorithm files:

- `src/algorithms/search.js` — contains `getNeighbors`, `bfs`, `astar`, and a Manhattan distance heuristic used by A*.

## Project structure

Key files and folders:

- `index.html` — app entry HTML used by Vite.
- `src/main.jsx` — React entry; mounts `App`.
- `src/App.jsx` — main component: board state, controls, solver integration, and step log.
- `src/components/PuzzleGrid.jsx` — visual grid and tile components.
- `src/components/Controls.jsx` — Shuffle and Solve buttons.
- `src/algorithms/search.js` — BFS and A* implementations.
- `src/*.css` — styling for the app.


## Algorithms and utilities

The `src/algorithms/search.js` file offers reusable functions:

- getNeighbors(state): returns valid next states for a given 3x3 board state.
- bfs(start, goal): returns an array (path) of states from start to goal if found.
- astar(start, goal): returns a path using A* and the Manhattan distance heuristic.

These functions use stringified states (`Array.prototype.toString()`) for `Set` membership checks, which is adequate for small educational projects but may be replaced with canonical string keys or more compact hashing for larger use cases.

## Example

The following minimal example demonstrates how to call the `bfs` and `astar` functions programmatically from `src/algorithms/search.js`. You can run this in a small Node script (after transpiling or using a bundler) or call the functions from the browser console if you expose them.

```javascript
// Example usage (node / bundler environment)
import { bfs, astar } from './src/algorithms/search.js';

// Start state: a small scramble of the goal
const start = [1, 2, 3, 4, 5, 6, 0, 7, 8];
const goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];

// Run BFS
const bfsPath = bfs(start, goal);
if (bfsPath) {
	console.log(`BFS found a solution in ${bfsPath.length - 1} moves`);
	// Print the sequence of states (rows joined for readability)
	bfsPath.forEach((state, i) => console.log(`Step ${i}:`, state.slice(0,3), state.slice(3,6), state.slice(6,9)));
} else {
	console.log('BFS: no solution found');
}

// Run A*
const astarPath = astar(start, goal);
if (astarPath) {
	console.log(`A* found a solution in ${astarPath.length - 1} moves`);
} else {
	console.log('A*: no solution found');
}
```

Notes:
- The example uses a very small scramble that should be solvable quickly. Larger scrambles may take much longer with BFS.
- In the bundled/browser environment the import path should be adjusted according to how you expose the module (for example, importing from `src/algorithms/search.js` in a Vite environment is straightforward).

## Tests (notes)

No automated tests are included in this repository. For reliability, consider adding unit tests for the algorithm functions (e.g., using Jest) and small integration tests for the UI (e.g., using React Testing Library).

## Contributing

Contributions are welcome. Possible improvements:

- Ensure shuffled boards are always solvable (by checking inversion parity).
- Allow choosing between BFS and A* from the UI.
- Improve performance and memory usage for large searches (bidirectional search, better state hashing).
- Add unit tests and CI.
- Add accessibility improvements and keyboard controls.

When contributing:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes with clear messages
4. Open a pull request describing the change and why it helps

## License

This project is provided under the MIT License. See `LICENSE` if present or add one when publishing.

## Acknowledgements

- Based on classic AI search algorithm examples and toy puzzle implementations used for teaching search algorithms.
- Vite and React for the development and fast HMR experience.


---

If you'd like, I can also:

- Add a small badge header (build/status) and link to a live demo if you have one.
- Wire the A* algorithm into the UI and add a selector to pick the algorithm.
- Add a small test suite for the `src/algorithms/search.js` functions.

Tell me which extras you'd like and I'll implement them next.
