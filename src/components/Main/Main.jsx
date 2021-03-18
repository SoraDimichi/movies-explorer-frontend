import React from 'react';
import './Main.css';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

const Main = () => (
  <main className="Main">
    <Promo />
    <AboutProject />
    <Techs />
    <AboutMe />
    <Portfolio />
  </main>
);

export default Main;
