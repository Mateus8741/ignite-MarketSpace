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
  variant?: 'default' | 'primary' | 'secondary'
}

type Modifiers = {
  [key: string]: {
    hover: string
    color: string
    background: string
  }
}

const modifiers: Modifiers = {
  default: {
    background: 'gray.500',
    hover: 'gray.400',
    color: 'gray.200'
  },
  primary: {
    background: 'blue.500',
    hover: 'blue.300',
    color: 'white'
  },
  secondary: {
    background: 'gray.100',
    hover: 'gray.200',
    color: 'white'
  }
}

export function Button({
  icon,
  children,
  variant = 'default',
  ...rest
}: ButtonProps) {
  const modifier = modifiers[variant]

  return (
    <ButtonNativeBase
      width="full"
      height={14}
      rounded="sm"
      backgroundColor={modifier.background}
      _pressed={{ bg: modifier.hover }}
      {...rest}
    >
      <HStack alignItems="center">
        {icon}

        <Text
          marginLeft={icon ? 2 : 0}
          color={modifier.color}
          fontFamily="heading"
          fontSize="sm"
        >
          {children}
        </Text>
      </HStack>
    </ButtonNativeBase>
  )
}
