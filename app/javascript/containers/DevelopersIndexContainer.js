import React, { Component } from 'react';
import DeveloperTile from '../components/DeveloperTile';


class DevelopersIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDevelopers: []
    }

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

  render(){

    let developersArr = this.state.allDevelopers.map(developer => {
      let profilePhoto = developer.profile_photo.url ? developer.profile_photo.url : developer.avatar_url;
      return(
        <DeveloperTile
          key={developer.id}
          id={developer.id}
          username={developer.username}
          fullName={developer.full_name}
          email={developer.email}
          photo={profilePhoto}
          />
      )
    })
    return(

      <div className="developer-list">
      <h1>All Developers</h1>
        {developersArr}
      </div>
    )
  }
}

export default DevelopersIndexContainer;
