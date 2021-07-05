import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router } from 'react-router-dom';
import myroute from './route';
ReactDOM.render(
  <Router>
  {renderRoutes(myroute.routes)}
  </Router>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept(function (err) {
    console.log('An error occurred while accepting new version');
  });
}