import React from 'react';

const DeveloperTile = (props) => {

  return(
    <div>
      Username: {props.username}<br/>
      Full name: {props.fullName}<br/>
      Email: {props.email}<br/>
      <hr/>
    </div>
  )
}

export default DeveloperTile;
