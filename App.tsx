import { StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'

import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts
} from '@expo-google-fonts/karla'

import { App } from './src/App'
import { theme } from './src/styles/theme'

export default function Index() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <App />
    </NativeBaseProvider>
  )
}
