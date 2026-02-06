import App from "./app.js";
import Player from "./player.js";
import Board from "./board.js";
import Ship from "./ship.js";

class HumanPlayer extends Player {
  constructor(name, boardSize) {
    super(name, boardSize);
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

const playerName = prompt("Введите имя игрока:");
const player = new HumanPlayer(playerName, 10);
console.log(`"${player.getName}"`);
