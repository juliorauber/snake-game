import { boardSize } from '../../constants'

import './board.css'

const Board = ({ children }) => {
  return (
    <div className="boards" style={{ width: boardSize, height: boardSize }}>
      {children}
    </div>
  )
}

export { Board }
