import './App.css'
import WeatherPage from './pages/WeatherPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LocationProvider } from './contexts/Location.context'
import NewsPage from './pages/NewsPage'
import Layout from './Layout/Layout'
import { WeatherImageProvider } from './contexts/WeatherImage.context'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { orange } from '@mui/material/colors'



const theme = createTheme({
  palette: {
    primary: {
      main: orange[500]
    }
  }
})

function App() {


  return (
    <>
      <Router>
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <LocationProvider>
              <WeatherImageProvider>
                <Layout>
                  <Routes>
                    <Route path='/' element={<WeatherPage />} />
                    <Route path='/news' element={<NewsPage />} />
                  </Routes>
                </Layout>
              </WeatherImageProvider>
            </LocationProvider>
          </ThemeProvider>
        </CssBaseline>
      </Router>
    </>
  )
}

export default App
