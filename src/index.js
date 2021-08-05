import React from "react";
import ReactDOM from "react-dom";
import { renderRoutes } from "react-router-config";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import myroute from "./route";

const history = createBrowserHistory();
ReactDOM.render(
  <Router history={history}>{renderRoutes(myroute.routes)}</Router>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept((err) => {
    console.log(
      `An error occurred while accepting new version,error is ${err}`
    );
  });
}
