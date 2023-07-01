// import { Container } from './styles';

import { HStack, Text } from 'native-base'
import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native'

type Method = 'boleto' | 'pix' | 'deposit' | 'cash' | 'card'

type PaymentMethodsProps = {
  methods: Method[]
  color: string
}

export function PaymentMethods({ methods, color }: PaymentMethodsProps) {
  return (
    <>
      {methods.includes('boleto') && (
        <HStack style={{ gap: 8 }} alignItems="center">
          <Barcode size={20} color={color} />
          <Text color={color} fontSize={14}>
            Boleto
          </Text>
        </HStack>
      )}

      {methods.includes('pix') && (
        <HStack style={{ gap: 8 }} alignItems="center">
          <QrCode size={20} color={color} />
          <Text color={color} fontSize={14}>
            Pix
          </Text>
        </HStack>
      )}

      {methods.includes('deposit') && (
        <HStack style={{ gap: 8 }} alignItems="center">
          <Bank size={20} color={color} />
          <Text color={color} fontSize={14}>
            Depósito Bancário
          </Text>
        </HStack>
      )}

      {methods.includes('cash') && (
        <HStack style={{ gap: 8 }} alignItems="center">
          <Money size={20} color={color} />
          <Text color={color} fontSize={14}>
            Dinheiro
          </Text>
        </HStack>
      )}

      {methods.includes('card') && (
        <HStack style={{ gap: 8 }} alignItems="center">
          <CreditCard size={20} color={color} />
          <Text color={color} fontSize={14}>
            Cartão de Crédito
          </Text>
        </HStack>
      )}
    </>
  )
}
