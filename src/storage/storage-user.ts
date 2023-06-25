import AsyncStorage from '@react-native-async-storage/async-storage'

import { userCollection } from '@/storage/storage-config'

export async function getUser() {
  const storage = await AsyncStorage.getItem(userCollection)

  const user: User = storage ? JSON.parse(storage) : {}

  return user
}

export async function saveUser(user: User) {
  await AsyncStorage.setItem(userCollection, JSON.stringify(user))
}

export async function deleteUser() {
  await AsyncStorage.removeItem(userCollection)
}
