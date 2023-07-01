import { useEffect, useState } from 'react'
import {
  Center,
  Checkbox,
  HStack,
  Heading,
  Radio,
  ScrollView,
  Spinner,
  Switch,
  Text,
  VStack,
  useTheme
} from 'native-base'

import { Plus } from 'phosphor-react-native'

import { Header } from '@/components/Header'
import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Touchables/Button'
import { Textarea } from '@/components/Form/Textarea'
import { SquareButton } from '@/components/Touchables/SquareButton'

export function Update() {
  const [isLoading, setIsLoading] = useState(true)

  const { colors } = useTheme()

  function handlePhotoSelect() {
    console.log('added')
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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} padding={6}>
        <Header marginTop={12} marginBottom={6}>
          Editar Anúncio
        </Header>

        <VStack style={{ gap: 16 }}>
          <VStack style={{ gap: 4 }}>
            <Heading color="gray.200" fontSize={16}>
              Imagens
            </Heading>

            <Text color="gray.300" fontSize={14}>
              Escolha até 3 imagens para mostrar o quanto o seu produto é
              incrível!
            </Text>
          </VStack>

          <HStack style={{ gap: 8 }}>
            <SquareButton onPress={handlePhotoSelect}>
              <Plus color={colors.gray[400]} />
            </SquareButton>
          </HStack>
        </VStack>

        <VStack marginTop={8}>
          <Heading marginY={2} color="gray.200" fontSize={16}>
            Sobre o produto
          </Heading>

          <Input
            width="100%"
            placeholder="Título"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Textarea
            width="100%"
            textAlignVertical="top"
            placeholder="Descrição"
          />

          <Radio.Group name="productCondition">
            <HStack>
              <Radio value="new" my="2" size="sm">
                <Text color="gray.200" fontSize={16}>
                  Produto novo
                </Text>
              </Radio>

              <Radio value="used" my="2" ml={5} size="sm">
                <Text color="gray.200" fontSize={16}>
                  Produto usado
                </Text>
              </Radio>
            </HStack>
          </Radio.Group>

          <Heading marginY={4} color="gray.200" fontSize={16}>
            Venda
          </Heading>

          <Input width="100%" placeholder="0,00" />

          <Heading marginBottom={4} color="gray.200" fontSize={14}>
            Aceita troca?
          </Heading>

          <Switch size="md" margin={0} />

          <Heading marginY={4} color="gray.200" fontSize={14}>
            Meios de pagamento aceitos
          </Heading>

          <Checkbox.Group
            style={{ gap: 8 }}
            accessibilityLabel="Escolha o método de pagamento."
          >
            <Checkbox value="boleto">
              <Text color="gray.300" fontSize={16}>
                Boleto
              </Text>
            </Checkbox>

            <Checkbox value="pix">
              <Text color="gray.300" fontSize={16}>
                Pix
              </Text>
            </Checkbox>

            <Checkbox value="cash">
              <Text color="gray.300" fontSize={16}>
                Dinheiro
              </Text>
            </Checkbox>

            <Checkbox value="card">
              <Text color="gray.300" fontSize={16}>
                Cartão de Crédito
              </Text>
            </Checkbox>

            <Checkbox value="deposit">
              <Text color="gray.300" fontSize={16}>
                Depósito Bancário
              </Text>
            </Checkbox>
          </Checkbox.Group>
        </VStack>
      </VStack>

      <HStack
        justifyContent="space-between"
        padding={6}
        paddingBottom={8}
        background="white"
      >
        <Button width="48%">Cancelar</Button>
        <Button width="48%" variant="secondary">
          Avançar
        </Button>
      </HStack>
    </ScrollView>
  )
}
