import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import SelectionPage from "./pages/SelectionPage";

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={SelectionPage} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
