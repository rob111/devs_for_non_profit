import React, { Component } from 'react';

class SelectDeveloper extends Component {
  constructor(props){
    super(props);
    this.state = {
      allDevelopers: []
    }
    this.getOptions = this.getOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    event.preventDefault(event);
    this.props.handleSelectChange(event.target.value);
  }

  componentDidMount(){
    fetch(`/api/v1/developers`, {
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
        allDevelopers: body
      })
    })
  }

  getOptions(){
    let developers = this.state.allDevelopers;
    let pDevs = this.props.projectDevelopers;
    const secondoptionUniqueIds = pDevs.map(option => option.id);
    const filteredOption = developers.filter(option => !secondoptionUniqueIds.includes(option.id));
    return filteredOption.map((developer, index) => {
      return <option key={index} value={developer.id}>{developer.full_name}</option>
    })
  }

  render() {
    return(
      <div className="dropdown">
        <p>Select Developer:</p>
      <form onSubmit={this.handleSelectChange}>
        <select
          onChange={this.handleChange}
        >
        <option value=''></option>
        { this.getOptions() }
        </select>
      </form>

      </div>
    )
  }
}
export default SelectDeveloper;
