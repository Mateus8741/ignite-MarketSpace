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

  return (
    <HStack {...rest} w="full" justifyContent="center" alignItems="center">
      <NativeButton
        variant="secondary"
        position="absolute"
        left={0}
        paddingX={5}
      >
        <ArrowLeft color={colors.gray[200]} />
      </NativeButton>

      <Heading color={colors.gray[200]}>{children}</Heading>
    </HStack>
  )
}
