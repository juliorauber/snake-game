import { useEffect, useState } from "react";
import "./App.css";

const MOVEMENTS = {
  UP: "TOP",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
  DOWN: "BOTTOM",
};

/*
  O boneco ta indo sempre pra um lado, não troca direção
  Ajustar lógica pro body da cobrinha seguir ela (a lógica atual só funciona pro primeiro)
    A cobrinha só pode crescer quando a comidinha "sair" pela bundinha
 
  Morrer caso bata nela
  Morrer caso saia do board
  Não pode ir pra trás

  Mensagem avisando "Pressione pra um lado pra iniciar"
  Algum menu pra iniciar
  Um placar mostrando os pontos
*/

function App() {
  const boardSize = 441;
  const numberOfPixelsOnBoard = 21;
  const pixelSize = boardSize / numberOfPixelsOnBoard;
  const centeredSnake = Math.ceil(numberOfPixelsOnBoard / 2);

  const [snakeBody, setSnakeBody] = useState([
    { x: centeredSnake, y: centeredSnake },
    { x: centeredSnake - 1, y: centeredSnake },
    { x: centeredSnake - 2, y: centeredSnake },
    { x: centeredSnake - 3, y: centeredSnake },
    { x: centeredSnake - 4, y: centeredSnake },
    { x: centeredSnake - 5, y: centeredSnake },
    { x: centeredSnake - 6, y: centeredSnake },
    { x: centeredSnake - 7, y: centeredSnake },
    { x: centeredSnake - 8, y: centeredSnake },
    { x: centeredSnake - 9, y: centeredSnake },
    { x: centeredSnake - 10, y: centeredSnake },
    { x: centeredSnake - 11, y: centeredSnake },
    { x: centeredSnake - 12, y: centeredSnake },
    { x: centeredSnake - 13, y: centeredSnake },
    { x: centeredSnake - 14, y: centeredSnake },
    { x: centeredSnake - 15, y: centeredSnake },
    { x: centeredSnake - 16, y: centeredSnake },
    { x: centeredSnake - 17, y: centeredSnake },
    { x: centeredSnake - 18, y: centeredSnake },
    { x: centeredSnake - 19, y: centeredSnake },
    { x: centeredSnake - 20, y: centeredSnake },
    { x: centeredSnake - 21, y: centeredSnake },
    { x: centeredSnake - 22, y: centeredSnake },
    { x: centeredSnake - 23, y: centeredSnake },
    { x: centeredSnake - 24, y: centeredSnake },
    { x: centeredSnake - 25, y: centeredSnake },
    { x: centeredSnake - 26, y: centeredSnake },
    { x: centeredSnake - 27, y: centeredSnake },
    { x: centeredSnake - 28, y: centeredSnake },
    { x: centeredSnake - 29, y: centeredSnake },
    { x: centeredSnake - 30, y: centeredSnake },
  ]);

  const [fruitPosition, setFruitPosition] = useState(null);

  const checkSnakeEatFruit = (snakeBody) => {
    const snakeHeadPosition = snakeBody[0];

    if (
      snakeHeadPosition.x === fruitPosition?.x &&
      snakeHeadPosition.y === fruitPosition?.y
    ) {
      setSnakeBody((currentSnakeBody) => [
        ...currentSnakeBody,
        currentSnakeBody[currentSnakeBody.length - 1],
      ]);

      randomizeFruitPosition(snakeBody);
    }
  };

  const randomizeFruitPosition = (snakeBody) => {
    const xPosition = Math.floor(Math.random() * numberOfPixelsOnBoard);
    const yPosition = Math.floor(Math.random() * numberOfPixelsOnBoard);

    const isInvalidPixel = snakeBody.some(
      (currentSnakeBody) =>
        currentSnakeBody?.x === xPosition && currentSnakeBody?.y === yPosition
    );

    if (isInvalidPixel) {
      // Essa recursividade aqui ta quebrando sepá
      // Mudar esta lógica pra criar um array com as posições possíveis, e o Math.random escolher uma delas
      return randomizeFruitPosition();
    }

    setFruitPosition({
      x: xPosition,
      y: yPosition,
    });
  };

  const moveSnake = (moveTo) => {
    const positionX =
      moveTo === MOVEMENTS.LEFT ? -1 : moveTo === MOVEMENTS.RIGHT ? 1 : 0;

    const positionY =
      moveTo === MOVEMENTS.UP ? -1 : moveTo === MOVEMENTS.DOWN ? 1 : 0;

    setSnakeBody((currentSnakeBody) => {
      const newHeadSnakePosition = {
        x: currentSnakeBody[0].x + positionX,
        y: currentSnakeBody[0].y + positionY,
      };

      return [
        newHeadSnakePosition,
        ...currentSnakeBody.slice(0, currentSnakeBody.length - 1),
      ];
    });
  };

  useEffect(() => {
    const handleEventKeydown = ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          moveSnake(MOVEMENTS.LEFT);
          break;
        case 38:
          moveSnake(MOVEMENTS.UP);
          break;
        case 39:
          moveSnake(MOVEMENTS.RIGHT);
          break;
        case 40:
          moveSnake(MOVEMENTS.DOWN);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleEventKeydown);

    randomizeFruitPosition(snakeBody);

    return () => {
      window.removeEventListener("keydown", handleEventKeydown);
    };
  }, []);

  useEffect(() => {
    checkSnakeEatFruit(snakeBody);
  }, [snakeBody]);

  return (
    <div className="main">
      <div className="header">
        <h1>Snake Game</h1>
      </div>
      <body>
        <h3>{snakeBody.length} Pontos</h3>
        <div className="board" style={{ width: boardSize, height: boardSize }}>
          {snakeBody.map((body, index) => (
            <div
              key={index}
              className="snake-body"
              style={{
                left: body.x * pixelSize,
                top: body.y * pixelSize,
                width: pixelSize,
                height: pixelSize,
              }}
            />
          ))}
          {fruitPosition ? (
            <div
              className="fruit"
              style={{
                left: fruitPosition.x * pixelSize,
                top: fruitPosition.y * pixelSize,
                width: pixelSize,
                height: pixelSize,
              }}
            />
          ) : null}
        </div>
      </body>
    </div>
  );
}

export default App;
