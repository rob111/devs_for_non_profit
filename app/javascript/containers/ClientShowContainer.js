import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as clientActions from '../actions/clients';

import ProjectTile from '../components/ProjectTile';

class ClientShowContainer extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchClientAction(this.props.params.id);
  }

  getPhoto() {
    const defaultUrl = '/assets/default-picture.jpg';
    let avatar;
    let profilePhoto;
    if (this.props.client && this.props.client.profile_photo)
      profilePhoto = this.props.client.profile_photo.url;
    const url = profilePhoto ? profilePhoto : defaultUrl;
    return <img src={url}/>
  }

  getSendMessageButton() {
    if(this.props.current_user.id != this.props.params.id)
      return <a className="button hidden" href={`/messages/new?receiver_id=${this.props.params.id}`}>Send Message</a>;
  }

  getNewProjectButton(){
    if (this.props.current_user.id == this.props.params.id)
      return <a className="button" href={`/clients/${this.props.params.id}/projects/new`}>New Project</a>;
  }

  getEditProfileMessage(){
    const currentUser = this.props.current_user;
    if(currentUser && (currentUser.id === this.props.params.id))
      return <div className="edit-message">Please add your information.</div>;

  }

  getCompanySize() {
    const info = this.props.client_info;
    if(info && info.company_size)
      return <div>Company size: {this.props.client_info.company_size} people</div>;
  }

  getDescription() {
    const info = this.props.client_info;
    if(info && info.description)
      return <div>About company: {this.props.client_info.description}</div>;
  }

  getRepPosition() {
    const info = this.props.client_info;
    if(info && info.rep_position)
      return <div>Title: {this.props.client_info.rep_position}</div>;
  }

  getClientProjects() {
    let clientProjects = this.props.projects.map( project => {
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
    return clientProjects;
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="small-12 medium-4 large-2 columns profile-photo">
            {this.getPhoto()}
          </div>
          <div className="large-8 medium-8 small-12 columns">
            <div className="full-name"><h2>{this.props.client.full_name}</h2></div>
            <hr/>
            {this.getEditProfileMessage()}
            {this.getRepPosition()}
            <div className="company-name">Company: {this.props.client.company}</div>
            <div className="email">Email: {this.props.client.email}</div>
            {this.getCompanySize()}
            {this.getDescription()}
            {this.getSendMessageButton()}
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-4 large-2 columns"></div>
          <div className="large-8 medium-8 small-12 columns">
            <h2 id="title">Client Projects</h2>
            <ul>{this.getClientProjects()}</ul>
            {this.getNewProjectButton()}
          </div>
        </div>
      </div>

    )
  }
}

export default connect(
  state => ({
    client: state.client.client,
    projects: state.client.projects,
    client_info: state.client.client_info,
    current_user: state.client.current_user
  }),
  clientActions
)(ClientShowContainer);
