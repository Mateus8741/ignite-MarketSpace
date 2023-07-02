/* eslint-disable no-useless-catch */
import { PropsWithChildren, createContext, useEffect, useState } from 'react'

import { api } from '@/lib/api'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave
} from '@/storage/storage-user'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave
} from '@/storage/storage-token'

type AuthState = {
  user: User
  accessToken: string
}

type SignInCredentials = {
  email: string
  password: string
}

export type AuthContextData = {
  user: User
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): Promise<void>
  isLoadingUserStorageData: boolean
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function userAndTokenUpdate(user: User, accessToken: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

    setData({ user, accessToken })
  }

  async function storageUserAndTokenSave(user: User, accessToken: string) {
    try {
      setIsLoadingUserStorageData(true)
      await storageUserSave(user)
      await storageAuthTokenSave(accessToken)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', { email, password })

      const { user, accessToken } = response.data

      if (user && accessToken) {
        await storageUserAndTokenSave(user, accessToken)
        await userAndTokenUpdate(user, accessToken)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setData({} as AuthState)

      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const userLogged = await storageUserGet()
      const accessToken = await storageAuthTokenGet()

      if (accessToken && userLogged) {
        await userAndTokenUpdate(userLogged, accessToken)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        isLoadingUserStorageData
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
