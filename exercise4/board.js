class Board {
  constructor(size) {
    this.size = parseInt(size);
    this.grid = this.createGrid(size);
    this.ships = [];
  }

  createGrid(size) {
    const numericSize = parseInt(size);
    const grid = [];
    for (let i = 0; i < numericSize; i++) {
      grid[i] = new Array(numericSize).fill(null);
    }
    return grid;
  }

  get getSize() {
    return this.size;
  }

  set setSize(size) {
    this.size = size;
    this.grid = this.createGrid(size);
  }

  get getGrid() {
    return this.grid;
  }

  set setGrid(grid) {
    this.grid = grid;
  }

  get getShips() {
    return this.ships;
  }

  set setShips(ships) {
    this.ships = ships;
  }

  placeShip(ship, x, y) {
    if (ship.getLocation === 0) {
      // горизонтально (меняется x)
      if (x + ship.getLength > this.size) return false;
      for (let i = 0; i < ship.getLength; i++) {
        if (this.grid[y][x + i] !== null) return false;
      }
      for (let i = 0; i < ship.getLength; i++) {
        this.grid[y][x + i] = { ship, index: i, hit: false };
      }
    } else {
      // вертикально (меняется y)
      if (y + ship.getLength > this.size) return false;
      for (let i = 0; i < ship.getLength; i++) {
        if (this.grid[y + i][x] !== null) return false;
      }
      for (let i = 0; i < ship.getLength; i++) {
        this.grid[y + i][x] = { ship, index: i, hit: false };
      }
    }

    return true;
  }

  findAvailableCells() {
    const availableCells = [];

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.grid[y][x] === null) {
          availableCells.push({ x, y });
        }
      }
    }

    return availableCells;
  }

  receiveAttack(x, y) {
    if (!this._inBounds(x, y)) return false;

    const cell = this.grid[y][x];

    if (cell === null) {
      return false;
    } else {
      if (cell.hit) {
        return true;
      }

      cell.hit = true;

      if (cell.ship && typeof cell.ship.hit === "function") {
        cell.ship.hit(cell.index);
      }
      return true;
    }
  }

  _inBounds(x, y) {
    return (
      Number.isInteger(x) &&
      Number.isInteger(y) &&
      x >= 0 &&
      y >= 0 &&
      x < this.size &&
      y < this.size
    );
  }

  /*
  O — пустая клетка
  S — корабль (неповреждённая часть)
  X — повреждённая часть корабля
   */
  display() {
    const rows = [];
    for (let y = 0; y < this.size; y++) {
      const row = [];
      for (let x = 0; x < this.size; x++) {
        const cell = this.grid[y][x] ?? null;
        if (cell === null) row.push("O");
        else if (cell.hit === true) row.push("X");
        else row.push("S");
      }
      rows.push(row.join(" "));
    }
    console.log(rows.join("\n"));
  }
}

export default Board;
