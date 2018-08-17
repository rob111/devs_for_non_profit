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
      developer_info: [],
      current_user_id: ''
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
        developer_info: body.info,
        current_user_id: body.current_user.id
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){

    let sendMessageButton;
    if (this.state.current_user_id != `${this.props.params.id}` ) {
      sendMessageButton = <a className="button" href={`/messages/new?receiver_id=${this.props.params.id}`}>Send Message</a>;
    }
    let developerInfo;
    let yearOfExperience = '';
    let technologies = '';
    let rate = '';
    if (this.state.developer_info != null) {
      yearOfExperience = <div>Years of experience: {this.state.developer_info.years_of_experience} years</div>;
      technologies = <div>Preferred technologies: {this.state.developer_info.preferred_technologies}</div>;
      rate = <div>Base hourly rate: ${this.state.developer_info.base_hourly_rate}</div>;
    }

    let profilePhoto;
    if (this.state.profile_photo.url != null ) {
      profilePhoto = <img src={this.state.profile_photo.url}/>
    }else{
      profilePhoto = <img src='/assets/default-picture.jpg'/>
    }
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
          <div className="small-12 medium-4 large-2 columns profile-photo">
            {profilePhoto}
          </div>
          <div className="large-8 medium-8 small-12 columns">
            <div><h2>{this.state.full_name}</h2></div>
            <hr/>
            <div id="company">Company: {this.state.company}</div>
            <div id="email">Email: {this.state.email}</div>
            <div>{yearOfExperience}</div>
            <div>{technologies}</div>
            <div>{rate}</div>
            <div>{sendMessageButton}</div>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-4 large-2 columns"></div>
          <div className="large-8 medium-8 small-12 columns">
            <h2 id="title">Developer Projects</h2>
            <ul>{developerProjects}</ul>
          </div>
        </div>
      </div>


    )
  }
}


export default DeveloperShowContainer;
