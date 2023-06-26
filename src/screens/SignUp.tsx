import { Heading, Image, Text, VStack } from 'native-base'
import { ScrollView, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import logoImg from '@/assets/logo.png'
import profileImg from '@/assets/profile.png'

import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Touchables/Button'

export function SignUp() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} alignItems="center" backgroundColor="gray.600">
        <VStack alignItems="center" padding={5}>
          <Image mt={10} source={logoImg} alt="Marketspace logo" />
          <Heading mt={4} color="gray.100" fontSize={20} fontFamily="heading">
            Boas vindas!
          </Heading>
          <Text mt={2} color="gray.200" fontSize={14} textAlign="center">
            Crie sua conta e use o espaço para comprar{'\n'}itens variados e
            vender seus produtos
          </Text>
        </VStack>

        <TouchableOpacity>
          <Image source={profileImg} alt="User Image" />
        </TouchableOpacity>

        <VStack alignItems="center" width="full" padding={5}>
          <Input width="100%" placeholder="Nome" autoCapitalize="none" />

          <Input
            width="100%"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            width="100%"
            placeholder="Telefone"
            keyboardType="number-pad"
            autoCapitalize="none"
          />

          <Input width="100%" secureTextEntry placeholder="Senha" />
          <Input width="100%" secureTextEntry placeholder="Confirmar senha" />

          <Button mt={5} variant="secondary" disabled>
            Criar
          </Button>

          <Text mt={8} color="gray.200">
            Já tem uma conta?
          </Text>

          <Button mt={4} onPress={handleGoBack}>
            Ir para login
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
