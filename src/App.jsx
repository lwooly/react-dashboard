import './App.css'
import WeatherPage from './pages/WeatherPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<WeatherPage/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
