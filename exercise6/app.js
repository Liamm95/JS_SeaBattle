import Player from "./player.js";
import Board from "./board.js";
import Ship from "./ship.js";

class App {
  constructor(boardSize, maxLengthShip, maxShips) {
    this.boardSize = boardSize;
    this.maxLengthShip = maxLengthShip;
    this.maxShips = maxShips;
    this.firstPlayer = null;
    this.secondPlayer = null;
  }

  get getBoardSize() {
    return this.boardSize;
  }

  set setBoardSize(boardSize) {
    this.boardSize = boardSize;
  }

  get getMaxLengthShip() {
    return this.maxLengthShip;
  }

  set setMaxLengthShip(maxLengthShip) {
    this.maxLengthShip = maxLengthShip;
  }

  get getMaxShips() {
    return this.maxShips;
  }

  set setMaxShips(maxShips) {
    this.maxShips = maxShips;
  }

  get getFirstPlayer() {
    return this.firstPlayer;
  }

  set setFirstPlayer(player) {
    if (player instanceof Player) {
      this.firstPlayer = player;
    } else {
      console.log("Player должен быть экземпляром класса Player");
    }
  }

  get getSecondPlayer() {
    return this.secondPlayer;
  }

  set setSecondPlayer(player) {
    if (player instanceof Player) {
      this.secondPlayer = player;
    } else {
      console.log("Player должен быть экземпляром класса Player");
    }
  }

  createPlayers(player1Name, player2Name) {
    this.firstPlayer = new Player(player1Name, this.boardSize);
    this.secondPlayer = new Player(player2Name, this.boardSize);
  }

  getPlayers() {
    return {
      firstPlayer: this.firstPlayer,
      secondPlayer: this.secondPlayer,
    };
  }

  shipArrangement(player, shipCount, maxShipLength) {
    for (let i = 1; i <= shipCount; i++) {
      const input = prompt(
        `Введите параметры корабля для ${player.getName} в таком формате: количество длина x,y ориентация:`
      );
      const parts = input.split(" ");
      shipCount = parseInt(parts[0]);
      const shipLength = parseInt(parts[1]);

      if (length > maxShipLength) {
        alert(
          `Ошибка! Длина корабля (${length}) превышает максимальную допустимую (${maxShipLength})`
        );
        i--;
        continue;
      }

      const [x, y] = parts[2].split(",").map(Number);
      const orientation = parseInt(parts[3]);

      // Автоматическое имя корабля
      const shipName = `Корабль №${i}`;

      // Проверяем координаты
      if (
        x < 0 ||
        x >= player.getBoardSize ||
        y < 0 ||
        y >= player.getBoardSize
      ) {
        alert(
          `Координаты должны быть в диапазоне 0-${player.getBoardSize - 1}!`
        );
        i--;
        continue;
      }

      const placementResult = player.placeShips(
        shipName,
        shipLength,
        orientation,
        { x, y }
      );

      // if (placementResult) {
      //   console.log(
      //     `Корабль размещен: ${shipName} длина:${length} (${x},${y}) ${
      //       orientation === 0 ? "горизонтально" : "вертикально"
      //     }`
      //   );
      // } else {
      //   alert("Не удалось разместить корабль №${i}");
      //   i--;
      // }

      console.log(
        `${player.getName} ${shipCount} ${maxShipLength} ${x},${y} ${orientation}`
      );
    }
  }

  run() {
    const firstPlayerName = prompt("Введите имя первого игрока:");
    const firstPlayer = new Player(firstPlayerName, this.boardSize);
    this.setFirstPlayer = firstPlayer;
    this.shipArrangement(
      this.firstPlayer,
      this.getMaxShips,
      this.getMaxLengthShip
    );
    const secondPlayerName = prompt("Введите имя второго игрока:");
    const secondPlayer = new Player(secondPlayerName, this.boardSize);
    this.setSecondPlayer = secondPlayer;
    this.shipArrangement(
      this.secondPlayer,
      this.getMaxShips,
      this.getMaxLengthShip
    );

    this.gameLoop();
  }

  gameLoop() {
    let currentPlayer = this.firstPlayer;
    let opponent = this.secondPlayer;
    let gameOver = false;
    let turnCount = 1;

    while (!gameOver) {
      console.log(`--- Ход ${turnCount} ---`);
      console.log(`Ходит: ${currentPlayer.getName}`);

      // Текущий игрок делает ход
      const attack = currentPlayer.takeTurn(opponent);
      const hit = attack.opponent.board.receiveAttack(attack.x, attack.y);

      if (hit) {
        console.log(
          `${currentPlayer.getName} попал в (${attack.x},${attack.y})!`
        );

        // Проверяем, не потоплен ли корабль
        const cell = attack.opponent.board.grid[attack.y][attack.x];
        if (cell && cell.ship && cell.ship.isSunk()) {
          console.log(
            `${currentPlayer.getName} потопил корабль "${cell.ship.getName}"!`
          );
        }
      } else {
        console.log(`Мимо!`);
      }

      // Показываем доску оппонента (только попадания/промахи)
      this.displayBoardWithHitsOnly(opponent.board);

      // Проверяем условие победы
      if (this.isPlayerDefeated(opponent)) {
        console.log(`${currentPlayer.getName}`);
        gameOver = true;
        break;
      }

      // Меняем игроков местами
      [currentPlayer, opponent] = [opponent, currentPlayer];
      turnCount++;
    }
  }

  displayBoardWithHitsOnly(board) {
    const rows = [];
    for (let y = 0; y < board.size; y++) {
      const row = [];
      for (let x = 0; x < board.size; x++) {
        const cell = board.grid[y][x];
        if (cell === null) {
          row.push("~"); // Вода
        } else if (cell.hit) {
          row.push("X"); // Попадание
        } else {
          row.push("~"); // Корабль, но еще не подбит - скрываем
        }
      }
      rows.push(row.join(" "));
    }
    console.log(rows.join("\n"));
  }

  // Проверка, все ли корабли игрока потоплены
  isPlayerDefeated(player) {
    // Проходим по всей доске и проверяем корабли
    for (let y = 0; y < player.board.size; y++) {
      for (let x = 0; x < player.board.size; x++) {
        const cell = player.board.grid[y][x];
        if (cell && cell.ship && !cell.ship.isSunk()) {
          return false; // Нашли непотопленный корабль
        }
      }
    }
    return true; // Все корабли потоплены
  }

  // Альтернативная проверка (если храните массив кораблей в Player)
  isPlayerDefeatedAlternative(player) {
    if (player.ships && player.ships.length > 0) {
      return player.ships.every((ship) => ship.isSunk());
    }
    return this.isPlayerDefeated(player); // fallback на проверку доски
  }
}

export default App;
