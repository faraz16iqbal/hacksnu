import { useEffect, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import RouteGuard from "./components/RouteGuard";
import "./App.css";
import { setAuthToken } from "./utils/misc";
import { createBrowserHistory } from "history";
import Admin from "./pages/Admin";
import Page from "./pages/Page";

const history = createBrowserHistory();

function App() {
  const token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));
  if (token) {
    setAuthToken(token);
  }
  useEffect(() => {}, []);

  return (
    <div className="App">
      <Navbar />

      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route path="/register" component={SignUp} />
          <RouteGuard
            exact
            path="/"
            component={user && user.isAdmin ? Admin : Page}
          />

          {/* <Route path="/" component={Home} /> */}
        </Switch>
        {/* <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<SignUp />}></Route> */}
      </Router>
    </div>
  );
}

export default App;
