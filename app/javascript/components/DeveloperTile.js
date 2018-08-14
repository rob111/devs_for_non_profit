import React from 'react';
import { Link } from 'react-router';

const DeveloperTile = (props) => {

  return(
    <div>
      <Link to={`/developers/${props.id}`}>
        <div className="row">
          <div className="columns medium-2 photo-tile">
            <img src={props.photo}/>
          </div>
          <div className="columns medium-10 dev-information">
            Username: {props.username}<br/>
            Full name: {props.fullName}<br/>
            Email: {props.email}<br/>
          </div>
        </div>
      </Link>
      <hr/>
    </div>
  )
}

export default DeveloperTile;
