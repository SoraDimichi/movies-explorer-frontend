import React from 'react';
import './AboutProject.css';

const AboutProject = () => (
  <section className="AboutProject" id="AboutProject">
    <div className="AboutProject__container">
      <h2 className="AboutProject__title">
        О проекте
      </h2>
      <h3 className="AboutProject__paragraph-title">
        Дипломный проект включал 5 этапов
      </h3>
      <p className="AboutProject__paragraph">
        Составление плана, работу над бэкендом, вёрстку,
        добавление функциональности и финальные доработки.
      </p>
      <h3 className="AboutProject__paragraph-title">
        На выполнение диплома ушло 5 недель
      </h3>
      <p className="AboutProject__paragraph">
        У каждого этапа был мягкий и жёсткий дедлайн, которые
        нужно было соблюдать, чтобы успешно защититься.
      </p>
      <p className="AboutProject__time-period AboutProject__time-period_back-end">
        1 неделя
      </p>
      <p className="AboutProject__time-period-name AboutProject__time-period-name_back-end">
        Back-end
      </p>
      <p className="AboutProject__time-period AboutProject__time-period_front-end">
        4 неделя
      </p>
      <p className="AboutProject__time-period-name AboutProject__time-period-name_front-end">
        Front-end
      </p>
    </div>
  </section>
);

export default AboutProject;
