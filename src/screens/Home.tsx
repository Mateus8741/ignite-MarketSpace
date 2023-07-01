import { useEffect, useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'

import {
  Center,
  FlatList,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
  useTheme
} from 'native-base'

import { ArrowRight, Plus, Tag } from 'phosphor-react-native'

import { useNavigation } from '@react-navigation/native'

import { Card } from '@/components/Card'
import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Touchables/Button'

const width = Dimensions.get('window').width

const products = [
  {
    id: '1',
    name: 'Luminária pendente',
    price: 45.5,
    images: [
      'data:image/jpeg;base64,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'
    ],
    methods: ['card', 'pix'],
    description: 'Luminária pendente',
    acceptTrade: false,
    isActive: true,
    isNew: true
  },
  {
    id: '2',
    name: 'Luminária pendente',
    price: 45.5,
    images: [
      'data:image/jpeg;base64,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'
    ],
    methods: ['card', 'pix'],
    description: 'Luminária pendente',
    acceptTrade: false,
    isActive: true,
    isNew: true
  },
  {
    id: '3',
    name: 'Luminária pendente',
    price: 45.5,
    images: [
      'data:image/jpeg;base64,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'
    ],
    methods: ['card', 'pix'],
    description: 'Luminária pendente',
    acceptTrade: false,
    isActive: true,
    isNew: false
  }
]

export function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const { colors } = useTheme()
  const navigation = useNavigation()

  function handleCreate() {
    navigation.navigate('create')
  }

  function handleAdsList() {
    navigation.navigate('ads')
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <Center flex={1} bg="gray.600">
        <Spinner color="blue.300" />
      </Center>
    )
  }

  return (
    <VStack flex={1} padding={6}>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        width="full"
        mt={12}
      >
        <HStack>
          <Image
            width={12}
            height={12}
            source={{
              uri: 'https://avatars.githubusercontent.com/u/19474041?v=4'
            }}
            alt="Foto de perfil"
            borderWidth={2}
            borderRadius="full"
            borderColor="blue.500"
          />

          <VStack ml="3">
            <Heading color="gray.300" fontSize={16} fontFamily="body">
              Boas Vindas,
            </Heading>
            <Text color="gray.200" fontSize={18} fontFamily="heading">
              Luciano!
            </Text>
          </VStack>
        </HStack>

        <Button
          icon={<Plus color="white" />}
          width={40}
          height={12}
          variant="secondary"
          onPress={handleCreate}
        >
          Criar Anúncio
        </Button>
      </HStack>

      <HStack mt={8}>
        <Text color="gray.300" fontSize={14}>
          Seus produtos anunciados para venda
        </Text>
      </HStack>

      <TouchableOpacity onPress={handleAdsList}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          width="full"
          height={20}
          padding={5}
          marginTop={2}
          borderRadius={8}
          backgroundColor="blue.700"
        >
          <HStack alignItems="center">
            <Tag color={colors.blue[500]} weight="regular" size={28} />

            <VStack marginLeft={4}>
              <Heading color="gray.200" fontSize={20} fontFamily="heading">
                4
              </Heading>

              <Text color="gray.300" fontSize={16}>
                anúncios ativos
              </Text>
            </VStack>
          </HStack>

          <HStack alignItems="center">
            <Heading mr={2} color={colors.blue[500]} fontSize={14}>
              Meus anúncios
            </Heading>

            <ArrowRight color={colors.blue[500]} weight="bold" size={20} />
          </HStack>
        </HStack>
      </TouchableOpacity>

      <VStack mt={8}>
        <Text color="gray.300" fontSize={14}>
          Compre produtos variados
        </Text>

        <Input mt={3} placeholder="Buscar anúncio" />
      </VStack>

      <FlatList
        flex={1}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            marginBottom={16}
            width={width / 2 - 32}
            height={100}
            item={item}
          />
        )}
        ListEmptyComponent={() => (
          <Center flex={1}>
            <Text color="gray.300" textAlign="center">
              Parece que nenhum produto foi anunciado ainda!
            </Text>
          </Center>
        )}
      />
    </VStack>
  )
}
