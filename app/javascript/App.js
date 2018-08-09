import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import UserIndexContainer from './containers/UserIndexContainer';
import DeveloperShowContainer from './containers/DeveloperShowContainer';
import ClientShowContainer from './containers/ClientShowContainer';
import ProjectShowContainer from './containers/ProjectShowContainer';

const App = (props) => {

  return (
    <Router history={browserHistory}>
      <Route path='/'>
        <Route path='/developers/:id' component={DeveloperShowContainer} />
        <Route path='/clients/:id' component={ClientShowContainer} />
        <Route path='/developers' component={UserIndexContainer} />
        <Route path='/clients' component={UserIndexContainer} />
        <Route path='/projects/:id' component={ProjectShowContainer} />
      </Route>
    </Router>
  )
}

export default App;
