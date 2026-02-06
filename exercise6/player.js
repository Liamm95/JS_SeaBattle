import Board from "./board.js";
import Ship from "./ship.js";

class Player {
  constructor(name, boardSize) {
    this.name = name;
    this.boardSize = boardSize;
    this.board = new Board(boardSize);
  }

  get getName() {
    return this.name;
  }

  set setName(name) {
    this.name = name;
  }

  get getBoardSize() {
    return this.boardSize;
  }

  set setBoardSize(boardSize) {
    this.boardSize = boardSize;
    this.board = new Board(boardSize);
  }

  placeShips(shipName, length, isVertical, startPosition) {
    const ship = new Ship(shipName, length, isVertical);
    const placementResult = this.board.placeShip(
      ship,
      startPosition.x,
      startPosition.y
    );

    return placementResult;
  }

  takeTurn(opponent) {
    const input = prompt("Введите координаты X и Y через пробел для атаки:");
    const [x, y] = input.split(" ").map(Number);

    // const xInput = prompt("Введите координаты X для атаки:");
    // const yInput = prompt("Введите координаты Y для атаки:");
    // const x = parseInt(xInput);
    // const y = parseInt(yInput);

    if (
      x < 0 ||
      x >= opponent.getBoardSize ||
      y < 0 ||
      y >= opponent.getBoardSize
    ) {
      alert(
        `Координаты должны быть в диапазоне 0-${opponent.getBoardSize - 1}!`
      );
    }

    return {
      x: x,
      y: y,
      opponent: opponent,
    };
  }
}

export default Player;
