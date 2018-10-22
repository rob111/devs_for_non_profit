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
        id,
        url
      },
    } = this;

    let className = 'clearfix tab-list-active';

    return (
      <li
        className={className}
        onClick={onClick}
        >
        <img src={url} alt="avatar" className="clip-circle"/>
        <div className="about">
          <div className="name">
            {label}
          </div>
          <div className="status">
            <i className="fa fa-circle online"></i> online
            </div>
          </div>
        </li>
    );
  }
}


export default TabTile;
