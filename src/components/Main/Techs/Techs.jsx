import React from 'react';
import './Techs.css';

const Techs = () => (
  <section className="Techs">
    <div className="Techs__container">
      <h2 className="Techs__title">Технологии</h2>
      <h3 className="Techs__attention-title">7 технологий</h3>
      <p className="Techs__attention-subtitle">
        На курсе веб-разработки мы освоили технологии,
        которые применили в дипломном проекте.
      </p>
      <ul className="Techs__stack">
        <li className="Techs__stack-tech">HTML</li>
        <li className="Techs__stack-tech">CSS</li>
        <li className="Techs__stack-tech">JS</li>
        <li className="Techs__stack-tech">React</li>
        <li className="Techs__stack-tech">Git</li>
        <li className="Techs__stack-tech">Express.js</li>
        <li className="Techs__stack-tech">mongoDB</li>
      </ul>
    </div>
  </section>
);

export default Techs;
