import AsyncStorage from '@react-native-async-storage/async-storage'

import { tokenCollection } from '@/storage/storage-config'

export async function storageAuthTokenGet() {
  return await AsyncStorage.getItem(tokenCollection)
}

export async function storageAuthTokenSave(token: string) {
  await AsyncStorage.setItem(tokenCollection, token)
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(tokenCollection)
}
