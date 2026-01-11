import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

import AuthContext from "./AuthContext";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PostFeed from "./components/PostFeed";
import CreatePost from "./components/CreatePost";
import Ideas from "./components/Ideas";
import Bookmark from "./components/Bookmark";
import Profile from "./components/Profile";
import SearchUsers from "./components/SearchUsers";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import NotFound from "./components/NotFound";

import "./App.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

class App extends Component {
  state = {
    loggedInUserId: null,
  };

  fetchCurrentUser = async () => {
    try {
      const jwtToken = Cookies.get("jwtToken");

      if (!jwtToken) return;

      const url = "http://localhost:5000/me";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      const { userId } = data;
      this.setState({ loggedInUserId: userId });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  componentDidMount() {
    this.fetchCurrentUser();
  }

  render() {
    const { loggedInUserId } = this.state;
    return (
      <AuthContext.Provider value={{ loggedInUserId }}>
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="dark"
            limit={3}
            newesetOnTop={true}
            preventDuplicate={true}
          />
          <Switch>
            <PublicRoute exact path="/sign-in" component={SignIn} />
            <PublicRoute exact path="/sign-up" component={SignUp} />

            <ProtectedRoute exact path="/" component={PostFeed} />
            <ProtectedRoute
              exact
              path="/users/profile/:id"
              component={Profile}
            />
            <ProtectedRoute exact path="/create" component={CreatePost} />
            <ProtectedRoute exact path="/ideas" component={Ideas} />
            <ProtectedRoute exact path="/bookmark" component={Bookmark} />
            <ProtectedRoute exact path="/search" component={SearchUsers} />

            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
