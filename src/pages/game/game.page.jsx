import { useEffect, useRef, useState } from 'react'
import { Board, Snake, Fruit } from '../../components'
import { GameStatus } from '../../components/modal/game_status'
import { GAME_STATUS, MOVEMENTS, snakeStartPosition } from '../../constants'
import { gameController } from '../../controller/game.controller'

import './game.css'

const speed = 250

const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const GamePage = () => {
  const {
    randomizeFruitPosition,
    moveSnake,
    checkSnakeAteFruit,
    snakeEatFood,
  } = gameController()

  const [gameStatus, setGameStatus] = useState(GAME_STATUS.INITIAL)
  const [snakeBody, setSnakeBody] = useState(snakeStartPosition)
  const [direction, setDirection] = useState(null)
  const [fruitPosition, setFruitPosition] = useState(
    randomizeFruitPosition({
      blockedPositions: snakeStartPosition,
    })
  )

  const initialGameState = () => {
    setGameStatus(GAME_STATUS.PLAYING)

    setSnakeBody(snakeStartPosition)

    const newFruitPosition = randomizeFruitPosition({
      blockedPositions: snakeStartPosition,
    })

    setFruitPosition(newFruitPosition)
  }

  useInterval(() => {
    if (direction != null) {
      moveSnake({
        moveTo: direction,
        onSnakeMove: setSnakeBody,
        body: snakeBody,
      })
    }
  }, speed)

  const handleEventKeydown = ({ keyCode }) => {
    if (MOVEMENTS[keyCode]) {
      setDirection(MOVEMENTS[keyCode])
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEventKeydown)
    return () => window.removeEventListener('keydown', handleEventKeydown)
  }, [snakeBody])

  useEffect(() => {
    const isSnakeEating = checkSnakeAteFruit({
      body: snakeBody,
      fruitPosition,
    })

    if (isSnakeEating) {
      snakeEatFood({ onSnakeEat: setSnakeBody })
      const newFruitPosition = randomizeFruitPosition({
        blockedPositions: snakeBody,
      })

      setFruitPosition(newFruitPosition)
    }
  }, [snakeBody])

  return (
    <div className="main">
      {/* <GameStatus
        gameStatus={gameStatus}
        onWin={initialGameState}
        onLoss={() => {}}
      /> */}
      {!!snakeBody ? (
        <>
          <h3>{snakeBody.length} Pontos</h3>
          <Board>
            <Snake body={snakeBody} />
            {!!fruitPosition ? (
              <Fruit
                positionX={fruitPosition?.x}
                positionY={fruitPosition?.y}
                onRandomizeFruit={setFruitPosition}
                blockedPositions={snakeBody}
              />
            ) : null}
          </Board>
        </>
      ) : null}
    </div>
  )
}

export { GamePage }
