const boardSize = 441
const numberOfPixelsOnBoard = 21
const pixelSize = boardSize / numberOfPixelsOnBoard

const MOVEMENTS = {
  UP: 'TOP',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  DOWN: 'DOWN',
  38: 'TOP',
  39: 'RIGHT',
  37: 'LEFT',
  40: 'DOWN',
}

const centeredSnake = Math.ceil(numberOfPixelsOnBoard / 2)
const snakeStartPosition = [
  { x: centeredSnake, y: centeredSnake },
  { x: centeredSnake - 1, y: centeredSnake },
  { x: centeredSnake - 2, y: centeredSnake },
]

const GAME_STATUS = {
  INITIAL: 'INITIAL',
  PLAYING: 'PLAYING',
  WINNER: 'WINNER',
  LOSER: 'LOSER',
}

export {
  boardSize,
  numberOfPixelsOnBoard,
  pixelSize,
  snakeStartPosition,
  MOVEMENTS,
  GAME_STATUS,
}
