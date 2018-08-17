import React, { Component } from 'react';
import BackButton from '../components/BackButton';
import DeveloperTile from '../components/DeveloperTile';
import SelectDeveloper from '../components/SelectDeveloper';

class ProjectShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      project_id: '',
      description: '',
      status: '',
      deadline: '',
      price: '',
      client_id: 0,
      active_user_id: null,
      projectDevelopers: [],
      selectedDeveloperId: 0,
      company: '',
      client_rep: ''
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.addDeveloper = this.addDeveloper.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.addDeveloperToProject = this.addDeveloperToProject.bind(this);
    this.addChangeStatus = this.addChangeStatus.bind(this);
    this.handleUpdateProject = this.handleUpdateProject.bind(this);
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
        project_id: body.project.id,
        description: body.project.description,
        status: body.project.status,
        deadline: body.project.deadline,
        price: body.project.price,
        client_id: body.project.client_id,
        projectDevelopers: body.developers,
        active_user_id: body.current_user.id,
        company: body.client.company,
        client_rep: body.client.full_name
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));

  }


  handleSelectChange(selectedOption){
    this.setState({selectedDeveloperId: selectedOption});
  }

  addDeveloper(event){
    let devId = parseInt(this.state.selectedDeveloperId);
    let formPayload ={
      project_id: this.state.project_id,
      developer_id: devId
    }

    fetch(`/api/v1/collaborations`,{
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => {
       if(response.ok){
         return response
       } else {
         let errorMessage = `${response.status} (${response.statusText})`,
             error = new Error(errorMessage)
         throw(error)
       }
     })
     .then(response => response.json())
     .then(body => {
       let newDevelopers = this.state.projectDevelopers.concat(body.developer)

       this.setState({
         projectDevelopers: newDevelopers
       })
     })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  changeStatus(){
    const statuses = [
      {value: 'Proposed', label: 'Proposed'},
      {value: 'Active', label: 'Active'},
      {value: 'Completed', label: 'Completed'},
      {value: 'Canceled', label: 'Canceled'}
    ]
    return statuses.map((status, index) => {
      return(
          <option key={index} value={status.value}>
            {status.label}
          </option>
      )
    })
  }

  handleUpdateProject(event){
    event.preventDefault();
    let formPayload = {
      project: {
        project_id: this.state.project_id,
        description: this.state.description,
        status: this.state.status,
        deadline: this.state.deadline,
        price: this.state.price,
        client_id: this.state.client_id
      }
    }

    fetch(`/api/v1/projects/${this.state.project_id}.json`,{
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(formPayload),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => {
       if(response.ok){
         return response
       } else {
         let errorMessage = `${response.status} (${response.statusText})`,
             error = new Error(errorMessage)
         throw(error)
       }
     })
     .then(response => response.json())
     .then(body => {
       this.setState({
         status: body.status
       })
     })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleStatusChange(event){
    event.preventDefault(event);
    this.setState({status: event.target.value})
  }

  addDeveloperToProject(){
    return(
      <div>
        <SelectDeveloper
          handleSelectChange={this.handleSelectChange}
          projectDevelopers={this.state.projectDevelopers}
          />
        <button onClick={this.addDeveloper}>Add developer</button>
      </div>
    )
  }

  addChangeStatus(){
    return(
      <div>
         <p>Change status: </p>
        <form onSubmit={this.handleUpdateProject}>
          <select onChange={this.handleStatusChange}>
            <option value=''></option>
            {this.changeStatus()}
          </select>
          <input type="submit" className="button" value="Change Status"/>
        </form>
      </div>
    )
  }

  render() {

    let changeProjectStatus;
    if (this.state.active_user_id == this.state.client_id) {
      changeProjectStatus = this.addChangeStatus();
    }

    let addDeveloper;
    if (this.state.active_user_id == this.state.client_id) {
      addDeveloper = this.addDeveloperToProject();
    }

    let developersArr = this.state.projectDevelopers.map(developer => {
      return(
        <DeveloperTile
          key={developer.id}
          id={developer.id}
          username={developer.username}
          fullName={developer.full_name}
          email={developer.email}
          photo={developer.profile_photo.url}
          />
      )
    })
    return(
      <div>
        <div><h2>{this.state.description}</h2></div>
        <div>Company: {this.state.company}</div>
        <div>Contact: <a href={`/clients/${this.state.client_id}`}>{this.state.client_rep}</a></div>
        <div>Status: {this.state.status}</div>
        <div className="dropdown">
          {changeProjectStatus}
        </div>
        <div>Deadline: {this.state.deadline}</div>
        <div><h3>Developers:</h3></div>
        <div>{developersArr}</div>
        <div className="dropdown">
          {addDeveloper}
        </div>
        <BackButton />
      </div>
    )
  }
}

export default ProjectShowContainer;
