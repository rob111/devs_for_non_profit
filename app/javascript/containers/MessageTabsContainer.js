import React, { Component } from 'react';

import TabTile from '../components/TabTile';
import NewMessageFormContainer from './NewMessageFormContainer';

class MessageTabsContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        allChats: [],
        activeTab: '',
        currentUserId: '',
        messages: []
      };
      this.sendNewMessage = this.sendNewMessage.bind(this);
    }

    componentDidMount(){
      // debugger;
      if (this.props.params.id !== undefined) {
        fetch(`/api/v1/chats/${this.props.params.id}`, {
          credentials: 'same-origin'
        })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(body => {
          let last = body.length - 1;
          this.setState({
            allChats: body,
            activeTab: body[last].id,
            currentUserId: body[last].current_user_id,
            messages: body[last].messages
          });
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
      } else {
        fetch(`/api/v1/chats`, {
          credentials: 'same-origin'
        })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(body => {
          this.setState({
            allChats: body,
            activeTab: body[0].id,
            currentUserId: body[0].current_user_id,
            messages: body[0].messages
          });
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
      }
    }

    sendNewMessage(formPayload){
      fetch('/api/v1/chats', {
        method: 'POST',
        body: JSON.stringify(formPayload),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then(body => {
        this.setState({messages: this.state.messages.concat(body)})
      })
    }

    onClickTabItem = (tabId) => {
      let selectedChat = this.state.allChats.find(chat => chat.id == tabId);
      let messages = selectedChat.messages;
      this.setState({
        activeTab: tabId,
        messages: messages
      });
    }

    getRecepient(currentUserId, authorId, receiverId){
      return currentUserId == authorId ? receiverId : authorId;
    }

    getRecepientUsername(chatId){
      let chat = this.state.allChats.find(chat => chatId == chat.id);
      return chat.author.id == this.state.currentUserId ? chat.receiver.username : chat.author.username;
    }

    getMessages(messages){
      const messageOutput = messages.map((message, key) => {
        let userName = message.user_id == this.state.currentUserId ? 'Me' : this.getRecepientUsername(message.chat_id);
        return <li key={key}>{`${userName}: ${message.body}`}</li>;
      });
      return <ul>{messageOutput}</ul>;
    }

    render() {
      const onClickTabItem = this.onClickTabItem;
      const { allChats, activeTab } = this.state;
      return (
        <div className="tabs">
          <h2 id='title'>Your conversations</h2>
          <div className="flex-grid-thirds">
            <div className="col">
              <ol className="tab-list">
                {allChats.map((chat) => {
                  const recepientId = this.getRecepient(chat.current_user_id, chat.author.id, chat.receiver.id);
                  let fullName = recepientId == chat.author.id ? chat.author.full_name : chat.receiver.full_name;
                  return (
                    <TabTile
                      activeTab={activeTab}
                      key={chat.id}
                      id={chat.id}
                      label={fullName}
                      onClick={onClickTabItem}
                      />
                  );
                })}
              </ol>
            </div>
            <div className="tab-content col">
              {this.getMessages(this.state.messages)}
              <NewMessageFormContainer
                currentUserId={this.state.currentUserId}
                activeTab={this.state.activeTab}
                sendNewMessage={this.sendNewMessage}
                />
            </div>
          </div>
        </div>
      );
    }
}

export default MessageTabsContainer;
