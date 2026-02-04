class Ship {
  constructor(name, length, location) {
    this.name = name;
    this.length = length;
    this.location = location; // true - вертикальный, false - горизонтальный
    this.hits = new Array(length).fill(false);
    this.startPosition = {
      x: 0,
      y: 0,
    };
  }

  get getName() {
    return this.name;
  }

  set setName(name) {
    this.name = name;
  }

  get getLength() {
    return this.length;
  }

  set setLength(length) {
    this.length = length;
  }

  get getLocation() {
    return this.location;
  }

  set setLocation(location) {
    this.location = location;
  }

  get getHits() {
    return this.hits;
  }

  set setHits(hits) {
    this.hits = hits;
  }

  get getStartPostition() {
    return this.startPosition;
  }

  set setStartPosition(startPosition) {
    this.startPosition = startPosition;
  }

  get getStartPostitionX() {
    return this.startPosition.x;
  }

  set setStartPositionX(startPositionX) {
    this.startPosition.x = startPositionX;
  }

  get getStartPostitionY() {
    return this.startPosition.y;
  }

  set setStartPositionY(startPositionY) {
    this.startPosition.y = startPositionY;
  }

  hit(index) {
    if (index >= 0 && index < this.length) {
      this.hits[index] = true;
    }
  }

  isSunk() {
    return this.hits.every((hit) => hit === true);
  }
}

export default Ship;
