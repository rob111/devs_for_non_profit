import React, { Component } from 'react';
import moment from 'moment';

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
          let currentChatId;
          let last = body.length - 1;
          let userId = this.props.params.id;
          let currentChat = body.find(chat => {
            if (chat.author.id == userId) {
              return currentChatId = chat.id;
            }else if (chat.receiver.id == userId) {
              return currentChatId = chat.id;
            }
          });
          this.setState({
            allChats: body,
            activeTab: currentChat.id,
            currentUserId: currentChat.current_user_id,
            messages: currentChat.messages
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
        let userName;
        let messageBody;
        let date = moment(message.created_at).format("MMM DD, YYYY - h:mma");

        if (message.user_id == this.state.currentUserId) {
          userName = 'Me';
          messageBody = <li className="clearfix" key={key}>
            <div className="message-data align-right">
              <span className="message-data-time" >{date}</span> &nbsp; &nbsp;
              <span className="message-data-name" >{userName}</span>
              <i className="fa fa-circle me"></i>
            </div>
            <div className="message other-message float-right">
              {message.body}
            </div>
          </li>
        } else {
          userName = this.getRecepientUsername(message.chat_id);
          messageBody = <li key={key}>
            <div className="message-data">
              <span className="message-data-name">
                <i className="fa fa-circle online"></i>
                {userName}
              </span>
              <span className="message-data-time">
                {date}
              </span>
            </div>
            <div className="message my-message">
              {message.body}
            </div>
          </li>
        }

        return messageBody;
      });
      return <ul className="chat-history-list">{messageOutput}</ul>;
    }

    getChatHeader(chatId){
      let url;
      let fullName;
      let chat = this.state.allChats.find(chat => chatId == chat.id);
      if(chat){
        chat.author.id == this.state.currentUserId ? chat.receiver.username : chat.author.username;
        if (chat.author.id == this.state.currentUserId) {
          fullName = chat.receiver.full_name;
          url = chat.receiver.profile_photo.url;
          if(!url){
            url = chat.receiver.avatar_url;
          }
        } else {
          fullName = chat.author.full_name;
          url = chat.author.profile_photo.url;
          if(!url){
            url = chat.author.avatar_url;
          }
        }
      }
      return <div className="chat-header clearfix"><img src={url} alt="avatar" className="clip-circle"/>
      <div className="chat-about">
        <div className="chat-with">{`Chat with ${fullName}`}</div>
      </div>
      <i className="fa fa-star"></i></div>
    }

    render() {
      const onClickTabItem = this.onClickTabItem;
      const { allChats, activeTab } = this.state;
      return (
        <div className="messages-container clearfix">
          <div className="people-list" id="people-list">
            <div className="search">
              <input type="text" placeholder="search" />
            </div>
              <ul className="list">
                {allChats.map((chat) => {
                  let url;
                  let fullName;
                  const recepientId = this.getRecepient(chat.current_user_id, chat.author.id, chat.receiver.id);
                  if (recepientId == chat.author.id) {
                    fullName = chat.author.full_name;
                    url = chat.author.profile_photo.url;
                    if(url == null){
                      url = chat.author.avatar_url;
                    }
                  } else {
                    fullName = chat.receiver.full_name;
                    url = chat.receiver.profile_photo.url;
                    if (url == null) {
                      url = chat.receiver.avatar_url;
                    }
                  }
                  return (
                    <TabTile
                      activeTab={activeTab}
                      key={chat.id}
                      id={chat.id}
                      label={fullName}
                      onClick={onClickTabItem}
                      url={url}
                      />
                  );
                })}
              </ul>
            </div>
            <div className="chat">
                {this.getChatHeader(activeTab)}
              <div className='chat-history'>
                {this.getMessages(this.state.messages)}
              </div>
              <NewMessageFormContainer
                currentUserId={this.state.currentUserId}
                activeTab={this.state.activeTab}
                sendNewMessage={this.sendNewMessage}
                />
            </div>
        </div>
      );
    }
}

export default MessageTabsContainer;
