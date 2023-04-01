import {
  dieWhenOutOfBounds,
  MOVEMENTS,
  numberOfPixelsOnBoard,
} from '../constants'

const gameController = () => {
  const moveSnake = ({ moveTo, onSnakeMove, body }) => {
    const positionX =
      moveTo === MOVEMENTS.LEFT ? -1 : moveTo === MOVEMENTS.RIGHT ? 1 : 0

    const positionY =
      moveTo === MOVEMENTS.UP ? -1 : moveTo === MOVEMENTS.DOWN ? 1 : 0

    const newPosition = {
      x: body[0].x + positionX,
      y: body[0].y + positionY,
    }

    const playerLossGame =
      checkSnakeAteItself({ newPosition, body }) ||
      (dieWhenOutOfBounds && checkOutOfBounds({ newPosition }))

    if (playerLossGame) {
      console.log('VOCÊ PERDEU, OTÁRIO!')
    } else {
      if (newPosition.x > numberOfPixelsOnBoard - 1) {
        onSnakeMove([
          { ...newPosition, x: 0 },
          ...body.slice(0, body.length - 1),
        ])
      } else if (newPosition.x < 0) {
        onSnakeMove([
          { ...newPosition, x: numberOfPixelsOnBoard - 1 },
          ...body.slice(0, body.length - 1),
        ])
      } else if (newPosition.y > numberOfPixelsOnBoard - 1) {
        onSnakeMove([
          { ...newPosition, y: 0 },
          ...body.slice(0, body.length - 1),
        ])
      } else if (newPosition.y < 0) {
        onSnakeMove([
          { ...newPosition, y: numberOfPixelsOnBoard - 1 },
          ...body.slice(0, body.length - 1),
        ])
      } else {
        onSnakeMove([newPosition, ...body.slice(0, body.length - 1)])
      }
    }
  }

  const snakeEatFood = ({ onSnakeEat }) => {
    onSnakeEat((currentSnakeBody) => [
      { ...currentSnakeBody[0], isEated: true },
      ...currentSnakeBody,
    ])
  }

  const randomizeFruitPosition = ({ blockedPositions }) => {
    const xPosition = Math.floor(Math.random() * numberOfPixelsOnBoard)
    const yPosition = Math.floor(Math.random() * numberOfPixelsOnBoard)

    const isInvalidPixel = blockedPositions.some(
      ({ x, y }) => x === xPosition && y === yPosition
    )

    if (isInvalidPixel) {
      return randomizeFruitPosition({ blockedPositions })
    }

    return {
      x: xPosition,
      y: yPosition,
    }
  }

  const checkSnakeAteFruit = ({ body, fruitPosition }) => {
    const snakeHeadPosition = body[0]

    return (
      snakeHeadPosition.x === fruitPosition?.x &&
      snakeHeadPosition.y === fruitPosition?.y
    )
  }

  const checkSnakeAteItself = ({ newPosition, body }) => {
    return body.some(
      ({ x: bodyX, y: bodyY }) =>
        newPosition.x === bodyX && newPosition.y === bodyY
    )
  }

  const checkOutOfBounds = ({ newPosition }) => {
    return (
      newPosition.x > numberOfPixelsOnBoard - 1 ||
      newPosition.x < 0 ||
      newPosition.y > numberOfPixelsOnBoard - 1 ||
      newPosition.y < 0
    )
  }

  return {
    randomizeFruitPosition,
    moveSnake,
    checkSnakeAteFruit,
    snakeEatFood,
  }
}

export { gameController }
