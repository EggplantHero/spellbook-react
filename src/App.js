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
import Paper from "./img/parchment-bg.jpg";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div style={{ background: `url(${Paper})`, height: "100vh" }}>
        <NavBar user={user} />
        <main
          className="container"
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/spells/:id" component={SpellForm} />
            <ProtectedRoute
              path="/spells"
              render={(props) => <Spells {...props} user={user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/spells" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
