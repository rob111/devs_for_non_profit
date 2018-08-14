import React from 'react';
import { Link } from 'react-router';

const ProjectTile = (props) => {
  return (
    <Link to={`/projects/${props.id}`}>
      <div className="project-tile">
        <div id="project-description">Description: {props.description}</div><br/>
        <div id="project-status">Status: {props.status}</div><br/>
        Deadline: {props.deadline}<br/>
        Price: ${props.price}<br/>
      </div>
    </Link>
  )
}

export default ProjectTile;
