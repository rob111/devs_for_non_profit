import React, { Component } from 'react';
import DeveloperProjectTile from '../components/DeveloperProjectTile';
import {connect} from 'react-redux';
import * as developerActions from '../actions/developers';

class DeveloperShowContainer extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDeveloperAction(this.props.params.id);
  }

  getSendMessageButton() {
    const currentUser = this.props.current_user;
    if (currentUser && (currentUser.id !== this.props.params.id))
      return <a
          className="button"
          href={`/chats/${this.props.developer.id}`}
          >
          Send Message
        </a>
  }

  getYearsOfExperience() {
    const info = this.props.info;
    if (info && info.years_of_experience)
      return <div>
        Years of experience: {info.years_of_experience} years
      </div>
  }

  getTechnologies() {
    const info = this.props.info;
    if (info && info.preferred_technologies)
      return <div>
        Preferred technologies: {info.preferred_technologies}
      </div>
  }

  getRate() {
    const info = this.props.info;
    if (info && info.base_hourly_rate)
      return <div>
        Base hourly rate: {info.base_hourly_rate}
      </div>
  }

  getEditProfileMessage() {
    const currentUser = this.props.current_user;
    if (currentUser && (currentUser.id === this.props.params.id))
      return <div className="edit-message">Please add your information.</div>
  }

  getDeveloperProjects() {
    const developer = this.props.developer;
    const projects = this.props.projects
    const clients = this.props.clients;

    if (developer && clients.length && projects.length)
      return projects.map(project => {
        const client = clients.find(client => client.id === project.client_id);
        const clientCompany = client ? client.company : '';
        const clientFullName = client ? client.full_name : '';
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
  }

  getPhoto() {
    const defaultUrl = '/assets/default-picture.jpg';
    let avatar;
    let profilePhoto
    if (this.props.developer)
      avatar = this.props.developer.avatar_url;
    if (this.props.developer && this.props.developer.profile_photo)
      profilePhoto = this.props.developer.profile_photo.url;

    const url = profilePhoto ? profilePhoto : avatar;
    return <img src={url ? url : defaultUrl}/>
  }

  render() {

    return(
      <div>
        <div className="row">
          <div className="small-12 medium-4 large-2 columns profile-photo">
            {this.getPhoto()}
          </div>
          <div className="large-8 medium-8 small-12 columns">
            <div><h2>{this.props.developer.full_name}</h2></div>
            <hr/>
            {this.getEditProfileMessage()}
            <div id="company">Company: {this.props.developer.company}</div>
            <div id="email">Email: {this.props.developer.email}</div>
            {this.getYearsOfExperience()}
            {this.getTechnologies()}
            {this.getRate()}
            {this.getSendMessageButton()}
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-4 large-2 columns"></div>
          <div className="large-8 medium-8 small-12 columns">
            <h2 id="title">Developer Projects</h2>
            <ul>{this.getDeveloperProjects()}</ul>
          </div>
        </div>
      </div>
    )
  }
}


export default connect(
  state => ({
    developer: state.developer.developer,
    projects: state.developer.projects,
    clients: state.developer.clients,
    info: state.developer.info,
    current_user: state.developer.current_user
  }),
  developerActions
)(DeveloperShowContainer);
