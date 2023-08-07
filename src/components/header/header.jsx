import './header.css'
import snakeIcon from '../../assets/icon-snake.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <header className="header">
      <img src={snakeIcon} alt="" className="flip" />
      <h1>Snake Game</h1>
      <img src={snakeIcon} alt="" />

      <button onClick={() => null}>
        <FontAwesomeIcon icon={faGear} size="2x" />
      </button>
    </header>
  )
}

export { Header }
