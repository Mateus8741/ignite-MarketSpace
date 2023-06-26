import { useContext, useEffect } from 'react'
import { Center, Spinner } from 'native-base'

import { AuthContext } from '@/contexts/AuthContext'

export function SignOut() {
  const { signOut } = useContext(AuthContext)

  useEffect(() => {
    async function getOut() {
      await signOut()
    }

    getOut()
  }, [])

  return (
    <Center flex={1} bg="gray.600">
      <Spinner color="blue.300" />
    </Center>
  )
}
