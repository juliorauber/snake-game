import './App.css'
import { Footer, Header } from './components'
import { GamePage } from './pages/game/game.page'

const App = () => {
  return (
    <body>
      <Header />
      <GamePage />
      <Footer />
    </body>
  )
}

export default App
