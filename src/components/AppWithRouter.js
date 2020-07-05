import React from 'react';
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, withRouter } from 'react-router-dom';

import HomePage from '../components/HomePage';
import Settings from '../components/Settings';
import NotFound from '../components/NotFound';

export const history = createBrowserHistory();

const Root = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/settings" component={Settings} />
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
