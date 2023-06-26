import { Heading, Image, Text, VStack } from 'native-base'
import { ScrollView } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import logoImg from '@/assets/logo.png'

import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Touchables/Button'

export function SignIn() {
  const navigation = useNavigation()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="gray.600"
        borderBottomRadius="3xl"
      >
        <VStack alignItems="center">
          <Image mt={10} source={logoImg} alt="Marketspace logo" />
          <Heading mt={4} color="gray.100" fontSize={32} fontFamily="heading">
            marketspace
          </Heading>
          <Text color="gray.200" fontSize={14}>
            Seu espaço de venda e compra
          </Text>
        </VStack>

        <VStack alignItems="center" width="full" p={5}>
          <Text mt={20} mb={4} color="gray.200">
            Acesse a sua conta
          </Text>

          <Input
            width="100%"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input width="100%" secureTextEntry placeholder="Senha" />

          <Button mt={8} variant="primary" disabled>
            Entrar
          </Button>
        </VStack>
      </VStack>

      <VStack
        flex={1}
        padding={5}
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
      >
        <Text color="gray.200">Ainda não tem acesso?</Text>

        <Button mt={4} variant="secondary" onPress={handleNewAccount}>
          Criar uma conta
        </Button>
      </VStack>
    </ScrollView>
  )
}
