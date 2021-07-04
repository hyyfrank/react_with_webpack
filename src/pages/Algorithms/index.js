import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
ReactDOM.render(
  <Home />,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept(function (err) {
    console.log('An error occurred while accepting new version');
  });
}