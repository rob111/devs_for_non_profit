import React, { Component } from 'react';
import ProjectTile from '../components/ProjectTile';

class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }

  }

  componentDidMount(){
    fetch(`/api/v1/projects`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        projects: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    const projectArr = this.state.projects.filter(project => {
      if(project.status == 'Completed' || project.status == 'Canceled'){
        return false;
      }
      return true;
    }).map(project => {
      return(
        <ProjectTile
        key={project.id}
        id={project.id}
        description={project.description}
        status={project.status}
        deadline={project.deadline}
        price={project.price}
        />
      )
    })

    return(
      <div>
      <h2>The projects you can assign and work on.</h2>
      {projectArr}
      </div>
    )
  }
}

export default ProjectsContainer;
