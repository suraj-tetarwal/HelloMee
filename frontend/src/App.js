import {BrowserRouter, Routes, Route} from 'react-router-dom'

import GlobalStyle from './GlobalStyle'

import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import CreateProfile from './components/CreateProfile'
import Home from './components/Home'

import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
