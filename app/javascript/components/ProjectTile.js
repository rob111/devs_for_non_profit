import React from 'react';
import { Link } from 'react-router';

const ProjectTile = (props) => {
  return (
    <Link to={`${props.link}`}>
      <div className="project-tile">
        <div id="project-description"><strong>Description: </strong>{props.description}</div>
        <div id="project-status"><strong>Status: </strong>{props.status}</div>
        <strong>Deadline: </strong>{props.deadline}<br/>
        <strong>Price: </strong>${props.price}<br/>
      </div>
    </Link>

  )
}

export default ProjectTile;
