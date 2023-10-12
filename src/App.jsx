import './App.css'
import WeatherPage from './pages/WeatherPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LocationProvider } from './contexts/Location.context'

function App() {

  return (
    <>
    <Router>
      <LocationProvider>
      <Routes>
        <Route path='/' element={<WeatherPage/>} />
      </Routes>
      </LocationProvider>
    </Router>
    </>
  )
}

export default App
