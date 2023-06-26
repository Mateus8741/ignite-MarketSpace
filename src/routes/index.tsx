import { useContext } from 'react'
import { Center, Spinner } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import { AuthContext } from '@/contexts/AuthContext'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  const { user, isLoadingUserStorageData } = useContext(AuthContext)
  const isAuthenticated = !!user

  if (isLoadingUserStorageData) {
    return (
      <Center flex={1} bg="gray.600">
        <Spinner color="blue.300" />
      </Center>
    )
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
