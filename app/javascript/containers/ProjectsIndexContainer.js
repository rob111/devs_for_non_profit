import React, { Component } from 'react';
import ProjectTile from '../components/ProjectTile';
import { Link } from 'react-router';

class ProjectsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      active_user_id: '',
      error: ''
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
        projects: body.project,
        active_user_id: body.current_user_id
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    let projectArr;
    const activeProjects = this.state.projects.filter(project => {
      if(project.status == 'Completed' || project.status == 'Canceled'){
        return false;
      }
      return true;
    })

    if(this.state.active_user_id) {
      projectArr = activeProjects.map(project => {
        return(
          <div>

                <ProjectTile
                key={project.id}
                id={project.id}
                description={project.description}
                status={project.status}
                deadline={project.deadline}
                price={project.price}
                link={`/projects/${project.id}`}
                />

          </div>
        )
      })
    } else {
      let link =
      projectArr = activeProjects.map(project => {
        return(
          <div>
            <ProjectTile
              key={project.id}
              id={project.id}
              description={project.description}
              status={project.status}
              deadline={project.deadline}
              price={project.price}
              link={'/'}
            />
          </div>
        )
      })
    }


    return(
      <div>
        <h2>List of available projects</h2>
        {projectArr}
      </div>
    )
  }
}


export default ProjectsIndexContainer;
