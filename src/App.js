import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Spells from "./components/spells";
import SpellForm from "./components/spellForm";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/spells/:id" component={SpellForm} />
            <Route
              path="/spells"
              render={(props) => <Spells {...props} user={user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/spells" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
