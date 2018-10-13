import React, { Component } from 'react';

import TabTile from '../components/TabTile';

class MessageTabsContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        allChats: [],
        activeTab: '',
        currentUserId: ''
      };
    }

    componentDidMount(){
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
        console.log(body);
        this.setState({
          allChats: body,
          activeTab: body[0].id,
          currentUserId: body[0].current_user_id
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    onClickTabItem = (tabId) => {
      this.setState({ activeTab: tabId });
    }

    getRecepient(currentUserId, authorId, receiverId){
      return currentUserId == authorId ? receiverId : authorId;
    }

    getRecepientUsername(chatId){
      let chat = this.state.allChats.find(chat => chatId == chat.id);
      let recepientUsername = chat.receiver.username;
      return recepientUsername;
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
      const chats = this.state.allChats;
      const activeTab = this.state.activeTab;
      return (
        <div className="tabs">
          <h2 id='title'>Your conversations</h2>
          <ol className="tab-list">
            {chats.map((chat) => {
              const recepientId = this.getRecepient(chat.current_user_id, chat.author.id, chat.receiver.id);
              let fullName = '';
              if (recepientId == chat.author.id) {
                fullName = chat.author.full_name;
              } else {
                fullName = chat.receiver.full_name;
              }
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
          <div className="tab-content">
            {chats.map((chat) => {
              if (chat.id !== activeTab){
                return undefined;
              } else {
                return this.getMessages(chat.messages);
              }
            })}
          </div>
        </div>
      );
    }
}

export default MessageTabsContainer;
