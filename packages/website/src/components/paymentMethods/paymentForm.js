import React from 'react'
import styled from 'styled-components'
import Form from '../../core/form'
import Button from '../../core/button'

const CardFormContainer = styled(Form)`
  margin: 90px;
  padding: 20px;
  border-style: none;
  background-color: #ff33f0;
  will-change: opacity, transform;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #829fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #819efc;
  flex-direction: column;
`

export default props => {
  return (
    <CardFormContainer onSubmit={props.onSubmit}>
      {props.children}
      <Button type="submit">Pay</Button>
    </CardFormContainer>
  )
}
