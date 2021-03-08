import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Page404 from '../Page404/Page404';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/signin" component={Login} />
      <Route path="/signup" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/movies" component={Movies} />
      <Route path="/saved-movies" component={Movies} />
      <Route path="*" component={Page404} />
    </Switch>
    <Footer />
  </div>
);

export default App;
