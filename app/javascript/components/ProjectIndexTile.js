import React from 'react';
import { Link } from 'react-router';

const ProjectIndexTile = (props) => {
  return (
    <Link to={`/projects`}>
      <div className="project-tile">
        <div id="project-description">Description: {props.description}</div><br/>
        <div id="project-status">Status: {props.status}</div><br/>
        Deadline: {props.deadline}<br/>
        Price: ${props.price}<br/>
      </div>
    </Link>

  )
}

export default ProjectIndexTile;
