import './App.css'
import WeatherPage from './pages/WeatherPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LocationProvider } from './contexts/Location.context'
import NewsPage from './pages/NewsPage'
import Layout from './Layout/Layout'

function App() {

  return (
    <>
      <Router>
        <LocationProvider>
          <Layout>
            <Routes>
              <Route path='/' element={<WeatherPage />} />
              <Route path='/news' element={<NewsPage />} />
            </Routes>
          </Layout>
        </LocationProvider>
      </Router>
    </>
  )
}

export default App
