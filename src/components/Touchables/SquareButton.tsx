import { ReactNode } from 'react'
import { Button, IButtonProps } from 'native-base'

type SquareButtonProps = IButtonProps & {
  children: ReactNode
}

export function SquareButton({ children, ...rest }: SquareButtonProps) {
  return (
    <Button
      width={88}
      height={88}
      backgroundColor="gray.500"
      _pressed={{
        borderWidth: 1,
        borderColor: 'gray.400',
        backgroundColor: 'gray.500'
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}
