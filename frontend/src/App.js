import {BrowserRouter, Routes, Route} from 'react-router-dom'

import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
