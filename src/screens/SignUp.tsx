/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import { Heading, Image, Text, VStack } from 'native-base'
import { Alert, ScrollView, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { AxiosError } from 'axios'
import { api } from '@/lib/api'

import logoImg from '@/assets/logo.png'
import profileImg from '@/assets/profile.png'

import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Touchables/Button'
import { AuthContext } from '@/contexts/AuthContext'

const createUserFormSchema = z.object({
  name: z.string().nonempty('O name é obrigatório'),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  phoneNumber: z.string().nonempty('O telefone é obrigatório'),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
  confirmPassword: z
    .string()
    .min(6, 'A senha deve conter no mínimo 6 caracteres')
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

type File = FileSystem.FileInfo & {
  size: number
}

type Photo = {
  uri: string
  type: string
  name: string
}

export function SignUp() {
  const [loading, setLoading] = useState(false)
  const [profileImageSelected, setProfileImageSelected] = useState<Photo>()

  const { signIn } = useContext(AuthContext)
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleCreateUser({
    name,
    email,
    password,
    phoneNumber
  }: CreateUserFormData) {
    try {
      setLoading(true)

      const dataForm = new FormData()

      const profileImage = {
        ...profileImageSelected,
        name: `${name}.${profileImageSelected?.name}`.toLowerCase()
      }

      dataForm.append('tel', phoneNumber)
      dataForm.append('name', name.toLowerCase())
      dataForm.append('email', email.toLowerCase())
      dataForm.append('avatar', profileImage as any)
      dataForm.append('password', password)

      const response = await api.post('/users', dataForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(response)

      await signIn({ email, password })

      Alert.alert('Sucesso', 'Conta criada com sucesso!')
    } catch (error) {
      let message = 'Não foi possível entrar. Tente novamente mais tarde.'

      console.log(error)

      if (error instanceof AxiosError) {
        message = error.message
      }

      Alert.alert('Oops', message)
    } finally {
      setLoading(false)
    }
  }

  async function handleAvatarSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })

      if (photoSelected.canceled) {
        return
      }

      const photoSelectedUri = photoSelected.assets[0].uri
      if (photoSelectedUri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelectedUri)
        const detail = photoInfo as File

        if (detail.size && detail.size / 1024 / 1024 > 5) {
          return Alert.alert(
            'Oops',
            'Essa imagem é muito grande. Escolha uma de até 5MB.'
          )
        }

        const fileExtension = photoSelectedUri.split('.').pop()

        const profileImage = {
          uri: photoSelectedUri,
          name: `${fileExtension}`.toLowerCase(),
          type: `${photoSelected.assets[0].type}/${fileExtension}`
        }

        setProfileImageSelected(profileImage)

        Alert.alert('Sucesso', 'Sua foto foi selecionada!')
      }
    } catch (error) {
      Alert.alert('Oops', 'Ocorreu um erro, tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
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

        <TouchableOpacity onPress={handleAvatarSelect}>
          {profileImageSelected ? (
            <Image
              width={20}
              height={20}
              borderWidth={2}
              borderRadius="full"
              borderColor="blue.500"
              source={{ uri: profileImageSelected.uri }}
              alt="User Image"
            />
          ) : (
            <Image source={profileImg} alt="User Image" />
          )}
        </TouchableOpacity>

        <VStack alignItems="center" width="full" padding={5}>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                width="100%"
                placeholder="Nome"
                autoCapitalize="none"
                onChangeText={onChange}
                error={errors.name?.message}
              />
            )}
          />

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
            name="phoneNumber"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                width="100%"
                placeholder="Telefone"
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={onChange}
                error={errors.phoneNumber?.message}
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

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                width="100%"
                secureTextEntry
                placeholder="Confirmar senha"
                onChangeText={onChange}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            mt={5}
            variant="secondary"
            disabled={loading}
            onPress={handleSubmit(handleCreateUser)}
          >
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
