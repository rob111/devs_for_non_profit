import React, { Component } from 'react';
import BackButton from '../components/BackButton';

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
      debugger;
      this.setState({
        description: body.project.description,
        status: body.status,
        deadline: body.deadline,
        price: body.price,
        client_id: body.client_id,
        developers: []
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    return(
      <div>
        <h1>Project Show Container</h1>
        <div>
          <b>Message to client</b>
        </div>
        <BackButton />
      </div>
    )
  }
}

export default ProjectShowContainer;
