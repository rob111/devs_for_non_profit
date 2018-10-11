import React, { Component } from 'react';

import MessageTabs from '../components/MessageTabs';

require('../../assets/stylesheets/tab-styles.scss');

const children = [
  {id: 1, label: "Gator", body: "See ya later, Alligator!"},
  {id: 2, label: 'Croc', body: 'After while, Crocodile!'},
  {id: 3, label: 'Sarcosuchus', body: 'Nothing to see here, this tab is extinct!'}
]

class MessagesIndexContainer extends Component {


  render() {
    return (
      <div>
        <h2 id='title'>Your conversations</h2>
        <MessageTabs>
        {children.map(child => {
          return(
            <div  label={child.label} key={child.key}>
              {child.body}
            </div>
          )
        })};
        </MessageTabs>
      </div>
    );
  }
}

export default MessagesIndexContainer;
