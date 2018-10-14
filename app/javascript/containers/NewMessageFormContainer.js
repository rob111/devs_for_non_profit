import React, { Component } from 'react';

import NewMessageBodyField from '../components/NewMessageBodyField';

class NewMessageFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      chat_id: this.props.activeTab,
      user_id: this.props.currentUserId
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);

  }

  handleSubmit(event){
    event.preventDefault();
    let newMessage = {
      user_id: this.props.currentUserId,
      chat_id: this.props.activeTab,
      body: this.state.body
    };
    this.props.sendNewMessage(newMessage);
    this.handleClearForm(event);
  }

  handleChange(event){
    this.setState({ body: event.target.value});
  }

  handleClearForm(event){
    event.preventDefault();
    this.setState({ body: '' });
  }

  validateMessage(){

  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <NewMessageBodyField
          name='message-body'
          content={this.state.body}
          onChange={this.handleChange}
        />
        <button className='button' onClick={this.handleClearForm}>Clear</button>
        <input className='button' type='submit' value='Send' />
      </form>
    )
  }
}

export default NewMessageFormContainer;
