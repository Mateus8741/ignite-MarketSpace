import { TouchableOpacity } from 'react-native'
import {
  Box,
  Heading,
  IStackProps,
  Image,
  Text,
  VStack,
  useTheme
} from 'native-base'

import { useNavigation } from '@react-navigation/native'

type CardProps = IStackProps & {
  item: Product
}

export function Card({ item, ...rest }: CardProps) {
  const { colors } = useTheme()
  const navigation = useNavigation()

  function handleClick() {
    navigation.navigate('ad', { id: item.id })
  }

  return (
    <TouchableOpacity onPress={handleClick}>
      <VStack position="relative" {...rest}>
        {item.isActive && (
          <TouchableOpacity
            style={{
              zIndex: 10,
              position: 'absolute',
              top: 8,
              right: 8,
              width: item.isNew ? 60 : 70,
              borderRadius: 20,
              marginBottom: 8,
              paddingVertical: 2,
              paddingHorizontal: 8,
              backgroundColor: item.isNew ? colors.blue[500] : colors.gray[500]
            }}
          >
            <Heading
              color={item.isNew ? colors.white : colors.gray[100]}
              textTransform="uppercase"
              textAlign="center"
              fontSize={16}
            >
              {item.isNew ? 'Novo' : 'Usado'}
            </Heading>
          </TouchableOpacity>
        )}

        <Box position="relative" alignItems="center" justifyContent="center">
          <Image
            width="lg"
            height={100}
            source={{ uri: item.images[0] }}
            alt={item.name}
            resizeMode="cover"
            borderColor="gray.500"
            borderRadius={10}
            borderWidth={1}
            blurRadius={item.isActive ? 0 : 10}
          />
        </Box>

        <Text
          color={item.isActive ? 'gray.200' : 'gray.400'}
          fontSize={14}
          mt={1}
        >
          {item.name}
        </Text>

        <Heading color={item.isActive ? 'gray.200' : 'gray.400'} fontSize={14}>
          R$ <Text fontSize={16}>{item.price}</Text>
        </Heading>
      </VStack>
    </TouchableOpacity>
  )
}
