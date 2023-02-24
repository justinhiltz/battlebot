import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import Footer from "./layout/Footer";

import Home from "./Home";
import BattleNewForm from "./BattleNewForm";
import BattleList from "./BattleList";
import BattleShow from "./BattleShow";
import UserBattleShow from "./UserBattleShow";
import About from "./About";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/users/:id" component={UserBattleShow} />
        <Route
          exact
          path="/battles/new"
          render={(props) => <BattleNewForm {...props} currentUser={currentUser} />}
        />
        <Route exact path="/battles" component={BattleList} />
        <Route exact path="/battles/:id" component={BattleShow} />
        <Route exact path="/about" component={About} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default hot(App);
