import React, { Component } from 'react';

import NewMessageBodyField from '../components/NewMessageBodyField';

class NewMessageFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      chat_id: this.props.activeTab,
      user_id: this.props.currentUserId,
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);

  }

  handleSubmit(event){
    event.preventDefault();
    if (this.validateMessage(this.state.body)) {
      let newMessage = {
        user_id: this.props.currentUserId,
        chat_id: this.props.activeTab,
        body: this.state.body
      };
      this.props.sendNewMessage(newMessage);
      this.handleClearForm(event);
    }
  }

  handleChange(event){
    this.validateMessage(event.target.value);
    this.setState({ body: event.target.value});
  }

  handleClearForm(event){
    event.preventDefault();
    this.setState({
      body: '',
      errors: {}
     });
  }

  validateMessage(input){
    if(input.trim() === ''){
      let newError = {body: 'You must enter a message.'}
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false;
    }else{
      let errorState = this.state.errors;
      delete errorState.body;
      this.setState({ errors: errorState })
      return true;
    }
  }

  render(){

    let errorDiv;
    let errorItems;

    if(Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return(
      <div className="chat-message clearfix">
        <form onSubmit={this.handleSubmit}>
          {errorDiv}
          <NewMessageBodyField
            name='message-to-send'
            content={this.state.body}
            onChange={this.handleChange}
            />
          <button className='button' type='submit'>Send</button>

        </form>

      </div>
    )
  }
}

export default NewMessageFormContainer;
