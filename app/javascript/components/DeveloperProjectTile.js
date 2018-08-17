import React from 'react';
import { Link } from 'react-router';

const DeveloperProjectTile = (props) => {

  return (
    <Link to={`/projects/${props.id}`}>
      <div className="project-tile">
        <div id="project-company"><strong>Company:</strong> {props.clientCompany}</div>
        <strong>Contact: </strong>{props.clientFullName}<br/>
        <div id="project-description"><strong>Description: </strong>{props.description}</div>
        <strong>Status: </strong>{props.status}<br/>
        <strong>Deadline: </strong>{props.deadline}<br/>
        <strong>Price: </strong>${props.price}<br/>
      </div>
    </Link>
  )
}

export default DeveloperProjectTile;
