import App from "./app.js";
import Player from "./player.js";
import Board from "./board.js";
import Ship from "./ship.js";

class AIPlayer extends Player {
  constructor(boardSize) {
    super("AIPlayer", boardSize);
  }

  placeShips(shipName, length, isVertical, startPosition) {
    shipName = "AIPlayer";
    startPosition.x = Math.floor(Math.random() * this.getBoardSize);
    startPosition.y = Math.floor(Math.random() * this.getBoardSize);
    const ship = new Ship(shipName, length, isVertical);
    const placementResult = this.board.placeShip(
      ship,
      startPosition.x,
      startPosition.y
    );
    return placementResult;
  }

  takeTurn(opponent) {
    const x = Math.floor(Math.random() * opponent.getBoardSize);
    const y = Math.floor(Math.random() * opponent.getBoardSize);

    return {
      x: x,
      y: y,
      opponent: opponent,
    };
  }
}

const player = new AIPlayer(10);
console.log(`"${player.getName}"`);
