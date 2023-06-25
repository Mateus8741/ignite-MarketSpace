import AsyncStorage from '@react-native-async-storage/async-storage'

import { tokenCollection } from '@/storage/storage-config'

export async function getToken() {
  await AsyncStorage.getItem(tokenCollection)
}

export async function saveToken(token: string) {
  await AsyncStorage.setItem(tokenCollection, token)
}

export async function deleteToken() {
  await AsyncStorage.removeItem(tokenCollection)
}
