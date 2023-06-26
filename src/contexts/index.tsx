import { ReactNode } from 'react'

import { AuthProvider } from './AuthContext'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return <AuthProvider>{children}</AuthProvider>
}
