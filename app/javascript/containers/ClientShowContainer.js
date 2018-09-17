import React, { Component } from 'react';
import ProjectTile from '../components/ProjectTile';

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
      client_info: [],
      current_user_id: null
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
        client_info: body.client_info,
        current_user_id: body.current_user.id
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let sendMessageButton;
    let newProjectLink;
    console.log(this.state.current_user_id);
    console.log(this.props.params.id);
    sendMessageButton = <a className="button hidden" href={`/messages/new?receiver_id=${this.props.params.id}`}>Send Message</a>;
    if (this.state.current_user_id == this.props.params.id) {
      newProjectLink = <a className="button" href={`/clients/${this.props.params.id}/projects/new`}>New Project</a>;
    }

    let editProfileMessage = '';
    let companySize = '';
    let description = '';
    let repPosition = '';
    if (this.state.client_info != null && this.state.client_info.description != '') {
      companySize = <div>Company size: {this.state.client_info.company_size} people</div>;
      description = <div>About company: {this.state.client_info.description}</div>;
      repPosition = <div>Title: {this.state.client_info.rep_position}</div>;
    }else if(this.props.params.id == this.state.current_user_id){
      editProfileMessage = <div className="edit-message">Please add your information.</div>;
    }

    let profilePhoto;
    if (this.state.profile_photo.url != null ) {
      profilePhoto = <img src={this.state.profile_photo.url}/>
    }else{
      profilePhoto = <img src='/assets/default-picture.jpg'/>
    }

    let clientProjects = this.state.projects.map( project => {
      return (
        <ProjectTile
          key={project.id}
          id={project.id}
          description={project.description}
          status={project.status}
          deadline={project.deadline}
          price={project.price}
          link={`/projects/${project.id}`}
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
            <div className="full-name"><h2>{this.state.full_name}</h2></div>
            <hr/>
            {editProfileMessage}
            <div>{repPosition}</div>
            <div className="company-name">Company: {this.state.company}</div>
            <div className="email">Email: {this.state.email}</div>
            <div>{companySize}</div>
            <div>{description}</div>
            <div>{sendMessageButton}</div>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-4 large-2 columns"></div>
          <div className="large-8 medium-8 small-12 columns">
            <h2 id="title">Client Projects</h2>
            <ul>{clientProjects}</ul>
            {newProjectLink}
          </div>
        </div>
      </div>

    )
  }
}

export default ClientShowContainer;
