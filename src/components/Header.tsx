import { useNavigation } from '@react-navigation/native'
import {
  HStack,
  IStackProps,
  Heading,
  Button as NativeButton,
  useTheme
} from 'native-base'

import { ArrowLeft } from 'phosphor-react-native'

type HeaderProps = IStackProps & {
  children: string
}

export function Header({ children, ...rest }: HeaderProps) {
  const { colors } = useTheme()

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <HStack {...rest} w="full" justifyContent="center" alignItems="center">
      <NativeButton
        left={0}
        variant="secondary"
        position="absolute"
        onPress={handleGoBack}
      >
        <ArrowLeft color={colors.gray[200]} />
      </NativeButton>

      <Heading color={colors.gray[200]}>{children}</Heading>
    </HStack>
  )
}
