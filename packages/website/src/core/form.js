import React from 'react'

export default props => (
  <form
    {...props}
    onSubmit={event => {
      event.preventDefault()
      if (props.onSubmit) {
        props.onSubmit(event)
      }
    }}
  />
)
