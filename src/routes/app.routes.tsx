import { useTheme } from 'native-base'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AdsSvg from '@/assets/icons/ads.svg'
import HomeSvg from '@/assets/icons/home.svg'
import SignOutSvg from '@/assets/icons/getout.svg'

import { Home } from '@/screens/Home'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function HomeTabs() {
  const theme = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.gray[200],
        tabBarInactiveTintColor: theme.colors.gray[400],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingTop: theme.sizes[6],
          paddingBottom: theme.sizes[10],
          borderTopWidth: theme.sizes[0],
          backgroundColor: theme.colors.white
        }
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg
              width={theme.sizes[6]}
              height={theme.sizes[6]}
              fill={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="ads"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <AdsSvg
              width={theme.sizes[6]}
              height={theme.sizes[6]}
              fill={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="signout"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <SignOutSvg
              width={theme.sizes[6]}
              height={theme.sizes[6]}
              fill={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="app"
    >
      <Stack.Screen name="app" component={HomeTabs} />
      <Stack.Screen name="ad" component={Home} />
    </Stack.Navigator>
  )
}
