import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    blue: {
      700: '#E0E1EB',
      500: '#647AC7',
      300: '#364D9D'
    },
    red: {
      300: '#EE7979'
    },
    gray: {
      700: '#F7F7F8',
      600: '#EDECEE',
      500: '#D9D8DA',
      400: '#9F9BA1',
      300: '#5F5B62',
      200: '#3E3A40',
      100: '#1A181B'
    },
    white: '#FFFFFF'
  },
  fonts: {
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular'
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20
  },
  sizes: {
    14: 56,
    33: 148
  }
})
