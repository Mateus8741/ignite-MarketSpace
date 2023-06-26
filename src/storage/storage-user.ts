import AsyncStorage from '@react-native-async-storage/async-storage'

import { userCollection } from '@/storage/storage-config'

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(userCollection)

  const user: User = storage ? JSON.parse(storage) : {}

  return user
}

export async function storageUserSave(user: User) {
  await AsyncStorage.setItem(userCollection, JSON.stringify(user))
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(userCollection)
}
