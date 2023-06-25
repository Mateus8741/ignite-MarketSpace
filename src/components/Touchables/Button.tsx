import { ReactNode } from 'react'
import {
  Button as ButtonNativeBase,
  IButtonProps,
  Text,
  HStack
} from 'native-base'

type ButtonProps = IButtonProps & {
  children: ReactNode
  icon?: ReactNode
  variant?: 'default' | 'secondary'
}

export function Button({
  icon,
  children,
  variant = 'default',
  ...rest
}: ButtonProps) {
  return (
    <ButtonNativeBase
      width="full"
      height={14}
      rounded="sm"
      backgroundColor={variant === 'secondary' ? 'gray.300' : 'blue.light'}
      _pressed={{ bg: variant === 'secondary' ? 'gray.200' : 'blue.default' }}
      {...rest}
    >
      <HStack alignItems="center">
        {icon}

        <Text
          marginLeft={icon ? 2 : 0}
          color={variant === 'secondary' ? 'gray.600' : 'white'}
          fontFamily="heading"
          fontSize="sm"
        >
          {children}
        </Text>
      </HStack>
    </ButtonNativeBase>
  )
}
