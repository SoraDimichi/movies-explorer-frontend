import React from 'react';
import './Page404.css';
import { Link } from 'react-router-dom';

const Page404 = () => (
  <main className="Page404">
    <div className="Page404__container">
      <h1 className="Page404__title">404</h1>
      <p className="Page404__subtitle">Страница не найдена</p>
      <Link className="Page404__history-link" to="/">Назад</Link>
    </div>
  </main>
);

export default Page404;
