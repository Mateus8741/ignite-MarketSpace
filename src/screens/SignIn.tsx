import { useContext, useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import { Heading, Image, Text, VStack } from 'native-base'

import { useNavigation } from '@react-navigation/native'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import logoImg from '@/assets/logo.png'

import { AuthContext } from '@/contexts/AuthContext'

import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Touchables/Button'

const signInFormSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres')
})

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignIn() {
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const { signIn } = useContext(AuthContext)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema)
  })

  async function handleSignIn({ email, password }: SignInFormData) {
    try {
      setLoading(true)

      await signIn({ email, password })
    } catch (error) {
      const message = 'Não foi possível entrar. Tente novamente mais tarde.'

      Alert.alert('Oops!', message)
    } finally {
      setLoading(false)
    }
  }

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

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                width="100%"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                width="100%"
                secureTextEntry
                placeholder="Senha"
                onChangeText={onChange}
                error={errors.password?.message}
              />
            )}
          />

          <Button
            mt={8}
            variant="primary"
            disabled={loading}
            onPress={handleSubmit(handleSignIn)}
          >
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
