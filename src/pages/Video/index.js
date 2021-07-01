import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

ReactDOM.render(<App />, document.getElementById("a"));
if (module.hot) {
    module.hot.accept(function (err) {
      console.log('An error occurred while accepting new version');
    });
  }