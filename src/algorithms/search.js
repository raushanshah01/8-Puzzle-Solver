// Helper: get neighbors (possible moves)
export function getNeighbors(state) {
  const neighbors = [];
  const index = state.indexOf(0);
  const row = Math.floor(index / 3);
  const col = index % 3;
  const moves = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  for (const [r, c] of moves) {
    if (r >= 0 && r < 3 && c >= 0 && c < 3) {
      const newIndex = r * 3 + c;
      const newState = [...state];
      [newState[index], newState[newIndex]] = [newState[newIndex], newState[index]];
      neighbors.push(newState);
    }
  }
  return neighbors;
}

// --- BFS Search ---
export function bfs(start, goal) {
  const queue = [[start]];
  const visited = new Set([start.toString()]);

  while (queue.length) {
    const path = queue.shift();
    const state = path[path.length - 1];

    if (state.toString() === goal.toString()) return path;

    for (const next of getNeighbors(state)) {
      if (!visited.has(next.toString())) {
        visited.add(next.toString());
        queue.push([...path, next]);
      }
    }
  }
  return null;
}

// --- A* Search ---
function manhattan(state, goal) {
  let dist = 0;
  for (let i = 0; i < 9; i++) {
    if (state[i] === 0) continue;
    const goalIndex = goal.indexOf(state[i]);
    const r1 = Math.floor(i / 3),
      c1 = i % 3;
    const r2 = Math.floor(goalIndex / 3),
      c2 = goalIndex % 3;
    dist += Math.abs(r1 - r2) + Math.abs(c1 - c2);
  }
  return dist;
}

export function astar(start, goal) {
  const open = [{ state: start, path: [start], cost: 0 }];
  const visited = new Set();

  while (open.length) {
    open.sort(
      (a, b) =>
        a.cost + manhattan(a.state, goal) -
        (b.cost + manhattan(b.state, goal))
    );

    const current = open.shift();
    const { state, path, cost } = current;

    if (state.toString() === goal.toString()) return path;

    visited.add(state.toString());

    for (const next of getNeighbors(state)) {
      if (!visited.has(next.toString())) {
        open.push({ state: next, path: [...path, next], cost: cost + 1 });
      }
    }
  }

  return null;
}
