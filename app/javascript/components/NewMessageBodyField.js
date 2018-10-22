import React from 'react';

const NewMessageBodyField = (props) => {
  return(
    <label value='Your message:'>
      <textarea
      name={props.name}
      type='text'
      value={props.content}
      onChange={props.onChange}
      id='message-to-send'
      placeholder='Type your message'
      rows='5'
      />
    </label>
  )
}

export default NewMessageBodyField;
