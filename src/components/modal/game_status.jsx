import { GAME_STATUS } from '../../constants'
import './game_status.css'

const GameStatus = ({ gameStatus, onWin, onLoss }) => {
  switch (gameStatus) {
    case GAME_STATUS.INITIAL:
      return (
        <div className="modal">
          <h3>Clique em alguma direção para iniciar!</h3>
        </div>
      )

    case GAME_STATUS.LOSER:
      return (
        <div className="modal">
          <h3>Você perdeu, bobalhão!</h3>
          <button onClick={onLoss}>Tentar Novamente</button>
        </div>
      )

    case GAME_STATUS.WINNER:
      return (
        <div className="modal">
          <h3>Ta porra se não é o bixão mesmo, você ganhou!</h3>
          <button onClick={onWin}>Tentar Novamente?</button>
        </div>
      )

    default:
      return null
  }
}

export { GameStatus }
