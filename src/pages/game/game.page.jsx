import { useEffect, useState } from 'react'
import { Board, Snake, Fruit } from '../../components'
import { GameStatus } from '../../components/modal/game_status'
import { GAME_STATUS, MOVEMENTS, snakeStartPosition } from '../../constants'
import { gameController } from '../../controller/game.controller'

import './game.css'

const GamePage = () => {
  const {
    randomizeFruitPosition,
    moveSnake,
    checkSnakeAteFruit,
    snakeEatFood,
  } = gameController()

  const [gameStatus, setGameStatus] = useState(GAME_STATUS.INITIAL)
  const [snakeBody, setSnakeBody] = useState(snakeStartPosition)
  const [moveTo, setMoveTo] = useState(null)
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

  useEffect(() => {
    const handleEventKeydown = ({ keyCode }) => {
      if (MOVEMENTS[keyCode]) {
        if (gameStatus === GAME_STATUS.INITIAL) {
          setGameStatus(GAME_STATUS.PLAYING)
        }

        moveSnake({
          moveTo: MOVEMENTS[keyCode],
          onSnakeMove: setSnakeBody,
          body: snakeBody,
        })
      }
    }

    window.addEventListener('keydown', handleEventKeydown)

    return () => {
      window.removeEventListener('keydown', handleEventKeydown)
    }
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
      <div className="header">
        <h1>Snake Game</h1>
      </div>
      <body>
        <GameStatus
          gameStatus={gameStatus}
          onWin={initialGameState}
          onLoss={() => {}}
        />
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
      </body>
    </div>
  )
}

export { GamePage }
