import React from 'react';
import { Link } from 'react-router';

const DeveloperProjectTile = (props) => {

  return (
    <Link to={`/projects/${props.id}`}>
      <div className="project-tile">
        <div id="project-company">Company: {props.clientCompany}</div><br/>
        Contact: {props.clientFullName}<br/>
        <div id="project-description">Description: {props.description}</div><br/>
        Status: {props.status}<br/>
        Deadline: {props.deadline}<br/>
        Price: ${props.price}<br/>
      </div>
    </Link>
  )
}

export default DeveloperProjectTile;
