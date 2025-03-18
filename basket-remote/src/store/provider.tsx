import React from 'react'
import { store } from './store'
import { Provider } from 'react-redux'
import { ReactNode } from 'react'

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}