import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import DeveloperShowContainer from './containers/DeveloperShowContainer';
import ClientShowContainer from './containers/ClientShowContainer';
import ProjectShowContainer from './containers/ProjectShowContainer';
import DevelopersIndexContainer from './containers/DevelopersIndexContainer';
import ProjectsIndexContainer from './containers/ProjectsIndexContainer';
import MessageTabsContainer from './containers/MessageTabsContainer';
import HomePageContainer from './containers/HomePageContainer';


const App = (props) => {

  return (
    <Router history={browserHistory}>
        <Route path='/' component={HomePageContainer} />
        <Route path='/developers/:id' component={DeveloperShowContainer} />
        <Route path='/clients/:id' component={ClientShowContainer} />
        <Route path='/developers' component={DevelopersIndexContainer} />
        <Route path='/projects/:id' component={ProjectShowContainer} />
        <Route path='/projects' component={ProjectsIndexContainer} />
        <Route path='/chats' component={MessageTabsContainer} />
        <Route path='/chats/:id' component={MessageTabsContainer} />
    </Router>
  )
}

export default App;
