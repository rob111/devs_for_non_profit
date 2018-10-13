import React, { Component } from 'react';

class TabTile extends Component {

  onClick = () => {
    const { id, label, onClick } = this.props;
    onClick(id);
  }

  render() {
    const {
      onClick,
      props: {
        activeTab,
        label,
        id
      },
    } = this;

    let className = 'tab-list-item';

    if (activeTab === id) {
      className += ' tab-list-active';
    }

    return (
      <li
        className={className}
        onClick={onClick}
      >
        {label}
      </li>
    );
  }
}


export default TabTile;
