import React from 'react'
import { routes } from '../../router/routes'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-items: center;
  margin: 30px;
  a {
    margin-bottom: 20px;
  }
`

export default () => (
  <Container>
    {routes.map(route => (
      <a key={route.path} href={route.path}>
        {route.path}
      </a>
    ))}
  </Container>
)
