import React, { Component } from 'react';
import ClientProjectTile from '../components/ClientProjectTile';

class ClientShowContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      full_name: '',
      username: '',
      email: '',
      company: '',
      profile_photo: '',
      projects: [],
      company_size: '',
      rep_position: '',
      description: ''
    }
  }

  componentDidMount(){

    fetch(`/api/v1/clients/${this.props.params.id}`, {
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
        full_name: body.client.full_name,
        username: body.client.username,
        email: body.client.email,
        company: body.client.company,
        profile_photo: body.client.profile_photo,
        projects: body.projects,
        company_size: body.client_info.company_size,
        rep_position: body.client_info.rep_position,
        description: body.client_info.description
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){

    let clientProjects = this.state.projects.map( project => {
      return (
        <ClientProjectTile
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
        <div className="row">
          <div className="small-12 medium-6 large-4 columns profile-photo">
            {this.state.profile_photo}
          </div>
          <div className="large-8 medium-6 small-12 columns">
            <div className="full-name"><h2>{this.state.full_name}</h2></div>
            <hr/>
            <div>Title: {this.state.rep_position}</div>
            <div className="company-name">Company: {this.state.company}</div>
            <div className="email">Email: {this.state.email}</div>
            <div>Company size: {this.state.company_size} people</div>
            <div>About company: {this.state.description}</div>
          </div>
          <div></div>
          <div></div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 large-4 columns"></div>
          <div className="large-10 medium-8 small-12 columns">
            <h2>Client Projects</h2>
            <ul>
              {clientProjects}
            </ul>
          </div>
        </div>
      </div>


    )
  }
}


export default ClientShowContainer;