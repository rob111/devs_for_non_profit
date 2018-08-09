import React, { Component } from 'react';
import DeveloperProjectTile from '../components/DeveloperProjectTile';

class DeveloperShowContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      full_name: '',
      username: '',
      email: '',
      company: '',
      profile_photo: '',
      projects: [],
      clients: [],
      developer_info: []
    }
  }

  componentDidMount(){

    fetch(`/api/v1/developers/${this.props.params.id}`, {
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
        full_name: body.developer.full_name,
        username: body.developer.username,
        email: body.developer.email,
        company: body.developer.company,
        profile_photo: body.developer.profile_photo,
        projects: body.projects,
        clients: body.clients,
        developer_info: body.info
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let clientCompany = '';
    let clientFullName = '';
    let developerProjects = this.state.projects.map(project => {
      this.state.clients.forEach( client => {
        if(client.id === project.client_id){
          clientCompany = client.company;
          clientFullName = client.full_name;
        }
      })
      return(
        <DeveloperProjectTile
          key={project.id}
          id={project.id}
          description={project.description}
          status={project.status}
          deadline={project.deadline}
          price={project.price}
          clientCompany={clientCompany}
          clientFullName={clientFullName}
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
            <div><h2>{this.state.full_name}</h2></div>
            <hr/>
            <div id="company">Company: {this.state.company}</div>
            <div id="email">Email: {this.state.email}</div>
            <div>Years of experience: {this.state.developer_info.years_of_experience} years</div>
            <div>Preferred technologies: {this.state.developer_info.preferred_technologies}</div>
            <div>Base hourly rate: ${this.state.developer_info.base_hourly_rate}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 large-4 columns"></div>
          <div className="large-10 medium-8 small-12 columns">
            <h2>Developer Projects</h2>
            <div>{developerProjects}</div>
          </div>
        </div>
      </div>


    )
  }
}


export default DeveloperShowContainer;
