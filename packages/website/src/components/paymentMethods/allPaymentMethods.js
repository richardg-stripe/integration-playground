import React, { useState } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Card from './card'
import Ideal from './ideal'
import Sepa from './sepa'
import { Div } from '../../core/div'
import Select from 'react-select'

const Container = styled(Div)`
  flex-direction: column;
`

const PAYMENT_METHODS = [
  { value: 'card', label: 'Card', component: Card },
  { value: 'ideal', label: 'iDEAL', component: Ideal },
  { value: 'sepa', label: 'Sepa', component: Sepa }
]

export default props => {
  const [paymentMethodValue, setPaymentMethodValue] = useState('card')
  const paymentMethod = _.find(PAYMENT_METHODS, { value: paymentMethodValue })
  console.log(paymentMethod)
  const PaymentMethodComponent = _.get(paymentMethod, 'component')
  return (
    <Container>
      <PaymentMethodComponent onSubmit={props.onSubmit} />
      <Select value={paymentMethod} onChange={newSelection => setPaymentMethodValue(newSelection.value)} options={PAYMENT_METHODS} />
    </Container>
  )
}
