import React from 'react';
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, withRouter } from 'react-router-dom';

import Main from '../components/Main';
import NotFound from '../components/NotFound';

export const history = createBrowserHistory();

const Root = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route component={NotFound} />
  </Switch>
);

const App = withRouter(Root);

const AppWithRouter = () => (
  <Router history={history}>
    <App />
  </Router>
);

export default AppWithRouter;
