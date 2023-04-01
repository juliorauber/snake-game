import { pixelSize } from '../../constants'

import './fruit.css'

const Fruit = ({ positionX, positionY }) => {
  return (
    <div
      className="fruit"
      style={{
        left: positionX * pixelSize,
        top: positionY * pixelSize,
        width: pixelSize,
        height: pixelSize,
      }}
    />
  )
}

export { Fruit }
