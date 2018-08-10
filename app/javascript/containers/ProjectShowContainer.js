import React, { Component } from 'react';
import BackButton from '../components/BackButton';
import DeveloperTile from '../components/DeveloperTile';

class ProjectShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      description: '',
      status: '',
      deadline: '',
      price: '',
      client_id: 0,
      developers: []

    }
  }

  componentDidMount() {
    fetch(`/api/v1/projects/${this.props.params.id}`, {
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
        description: body.project.description,
        status: body.project.status,
        deadline: body.project.deadline,
        price: body.project.price,
        client_id: body.project.client_id,
        developers: body.developers
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let projectDevelopers = this.state.developers.map(developer => {
      return(
        <DeveloperTile
          key={developer.id}
          id={developer.id}
          username={developer.username}
          fullName={developer.full_name}
          email={developer.email}
          />
      )
    })
    return(
      <div>
        <div><h2>{this.state.description}</h2></div>
        <div>Status: {this.state.status}</div>
        <div>Deadline: {this.state.deadline}</div>
        <div><h3>Developers:</h3></div>
        <div>{projectDevelopers}</div>

        <div>
          <button>Message to client</button>
        </div>
        <BackButton />
      </div>
    )
  }
}

export default ProjectShowContainer;
