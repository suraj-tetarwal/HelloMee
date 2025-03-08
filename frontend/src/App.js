import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import GlobalStyle from './GlobalStyle'

import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import CreateProfile from './components/CreateProfile'
import Home from './components/Home'
import SearchUser from './components/SearchUser'
import NotificationFeed from './components/NotificationFeed'
import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ToastContainer
        position='top-center'
        autoClose={3000}
        limit={3}
        theme="dark"
        newestOnTop={true}
        preventDuplicates={true}
      />
      <Switch>
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/create-profile" component={CreateProfile} />
        <Route exact path="/search" component={SearchUser} />
        <Route exact path="/notifications" component={NotificationFeed} />
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
