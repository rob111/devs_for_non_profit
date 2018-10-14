import React from 'react';

const NewMessageBodyField = (props) => {
  return(
    <label value='Your message:'>
      <textarea
      name={props.name}
      type='text'
      value={props.content}
      onChange={props.onChange}
      />
    </label>
  )
}

export default NewMessageBodyField;
