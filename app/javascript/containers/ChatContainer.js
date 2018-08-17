import React, { Component } from 'react';
import Message from '../components/Message';
import TextFieldWithSubmit from '../components/TextFieldWithSubmit';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: {},
      messages: [],
      message: '',
      value: ''
    }

    this.handleMessageReceipt = this.handleMessageReceipt.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectSubmit = this.handleSelectSubmit.bind(this);
  }


  componentDidMount() {

    fetch(`/api/v1/chats/${this.props.params.id}`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      let { ok } = response;

      if (ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log("IN THE THEN!!!!!!!");
      console.log(data);
      console.log(this.props.params);
      this.setState({chat: data})
      // slightly worried about asynchrnous nature of setState
      // return data.chat_id
    })

    // .then((chatId) => {
      App.chatChannel = App.cable.subscriptions.create(
        // Info that is sent to the subscribed method
        {
          channel: "ChatChannel",
          chat_id: this.state.chat.id
        },
        {
          connected: () => console.log("ChatChannel connected"),
          disconnected: () => console.log("ChatChannel disconnected"),
          received: data => {
            // Data broadcasted from the chat channel
            console.log(data)
            this.handleMessageReceipt(data)
          }
        }
      );
    // })
    // console.log(this.props.params.id)

  }

  handleMessageReceipt(message) {
    this.setState({ messages: this.state.messages.concat(message) })
  }

  handleClearForm() {
    this.setState({ message: '' })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let prepMessage = this.state.message
    let user_info = this.state.user

    // Send info to the receive method on the back end
    App.chatChannel.send({
     message: prepMessage,
     user: user_info
    })

    this.handleClearForm();
  }

  handleMessageChange(event) {
    this.setState({ message: event.target.value })
  }

  handleSelectSubmit(event){
    event.preventDefault();
    alert(this.state.value);
  }

  handleSelectChange(event){
    this.setState({ value: event.target.value})
  }

  render() {
    let messages = this.state.messages.map(message => {
      return(
        <Message
          key={message.messageId}
          handle={message.user.handle}
          icon={message.user.icon_num}
          message={message.message}
        />
      )
    }, this);

    return(
      <div>
        <div className='callout chat' id='chatWindow'>
          {messages}
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <TextFieldWithSubmit
            content={this.state.message}
            name='message'
            handlerFunction={this.handleMessageChange}
          />
        </form>
        <form onSubmit={this.handleSelectSubmit}>
          Choose a chat:
          <select value={this.state.value} onChange={this.handleSelectChange}>
            <option value='1'>First channel</option>
            <option value='2'>Second channel</option>
            <option value='3'>Third channel</option>
          </select>
        </form>
      </div>
    );
  }
}

export default ChatContainer;
