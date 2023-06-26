import { useEffect, useState } from 'react'
import {
  Center,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  VStack
} from 'native-base'
import { Button } from '@/components/Touchables/Button'
import { ArrowRight, Plus, Tag } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { Input } from '@/components/Form/Input'

export function Home() {
  const [isLoading, setIsLoading] = useState(true)

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
        >
          Criar Anúncio
        </Button>
      </HStack>

      <HStack mt={8}>
        <Text color="gray.300" fontSize={14}>
          Seus produtos anunciados para venda
        </Text>
      </HStack>

      <TouchableOpacity>
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
            <Tag color="#647AC7" weight="regular" size={28} />

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
            <Heading mr={2} color="#647AC7" fontSize={14}>
              Meus anúncios
            </Heading>

            <ArrowRight color="#647AC7" weight="bold" size={20} />
          </HStack>
        </HStack>
      </TouchableOpacity>

      <VStack mt={8}>
        <Text color="gray.300" fontSize={14}>
          Compre produtos variados
        </Text>

        <Input mt={3} placeholder="Buscar anúncio" />
      </VStack>
    </VStack>
  )
}
