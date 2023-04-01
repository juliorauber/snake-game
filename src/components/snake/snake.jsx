import { pixelSize } from '../../constants/board.constant'

import './snake.css'

const Snake = ({ body = [] }) => {
  const getClassName = ({ index, isEated }) => {
    if (index === 0) return 'snake-head'
    if (isEated && index !== body.length - 1) return 'snake-body-eated'
    return 'snake-body'
  }

  return body.map(({ x, y, isEated }, index) => (
    <div
      key={index}
      className={getClassName({ index, isEated })}
      style={{
        left: x * pixelSize,
        top: y * pixelSize,
        width: pixelSize,
        height: pixelSize,
      }}
    />
  ))
}

export { Snake }
