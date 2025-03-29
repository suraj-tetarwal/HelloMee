import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import GlobalStyle from './GlobalStyle'

import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import CreateProfile from './components/CreateProfile'
import Home from './components/Home'
import SearchUser from './components/SearchUser'
import UserProfile from './components/UserProfile'
import CreatePost from './components/CreatePost'
import NotificationFeed from './components/NotificationFeed'
import EditProfile from './components/EditProfile'
import AIChatBot from './components/AIChatBot'
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
	<Route exact path="/" component={Home} />
        <Route exact path="/search" component={SearchUser} />
	<Route exact path="/profile/:userId" component={UserProfile} />
	<Route exact path="/new-post" component={CreatePost} />
        <Route exact path="/notifications" component={NotificationFeed} />
	<Route exact path="/ai-chat" component={AIChatBot} />
	<Route exact path="/edit-profile" component={EditProfile} />
        <Route exact component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
