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

const history = createBrowserHistory();

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  return (
    <div className="App">
      <Navbar />

      <Router history={history}>
        <Route exact path="/login" component={SignIn} />
        <Route path="/register" component={SignUp} />
        <Route exact path="/" component={Home} />
        {/* <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<SignUp />}></Route> */}
      </Router>
    </div>
  );
}

export default App;
