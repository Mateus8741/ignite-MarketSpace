import { useEffect, useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'

import {
  Center,
  HStack,
  Heading,
  Image,
  ScrollView,
  Spinner,
  Text,
  VStack,
  useTheme
} from 'native-base'

import { Power, TrashSimple } from 'phosphor-react-native'

import { useNavigation } from '@react-navigation/native'

import Carousel from 'react-native-reanimated-carousel'

import { Button } from '@/components/Touchables/Button'
import { PaymentMethods } from '@/components/PaymentMethods'
import { Header } from '@/components/Header'

const images = [
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHgAtAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQADAQIGBwj/xAA9EAACAQMCAwYDBQYGAgMAAAABAgMABBESIQUxQRMiUWFxgRQykQZCobHBI4LR4fDxBxVDYnKSU6IWM1L/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAmEQACAgICAgICAgMAAAAAAAAAAQIRAxIhMUFRBBMigXGxFEJh/9oADAMBAAIRAxEAPwDzxICrYxnzFHwWcjHaNj7Vpaysm4NMVu5CMHNdEWSaKjbNC2GBB8GGDRFuHLA6SVHM4rVXJYHJyOtGJcSMNLElafZCpBnD935qQDttXVWbOYWQOoyOWa5i2ki2BBz50zgcJ8pA96lJ2UjwdDbK8B76EnmCN6LuhPPFpiRSTyDHApTbcYnigKBkIO2cVW3FJCVGoBR0FJTHtDq/4Ja3vCWZo0iuUXuSgnEZrkuPzrd3bvqLqFVQBsCR1x9abScZmMJiDgKelARwRXayPNdRxOPlV8976CqY+Oyc/wDglMlw8aRtK5RD3Vz8tFQ8HvJYTN8O4jAzqYEc6PjysRjUgZ5grsPTNGfGXMkaxNKSg5L0qjlXRNKxfbcGue0AwsbAba2GKdW3CJVjzHKpA3kAJAqj4bs3jbXuRk4B2rduIpExQ6iB0U86nJt9DpJDEWsJtHVEyWGDgUPFY6OeB50L/mrykaCIIl2JJ3FYHEo3LIHfSdgcZz51PVj2g3tYbZXIZWcdCapg4oZmwy6fQUs0o2QQGz486PsToOiNCQfbHvQ1QdhgZsgM3Ictt81H4lMtu8cexJ7rZ5VcqQasSgIOg1FjV9xYWkkBMU4Rh47g1kkjO2c5ddrcyK1zIxXO5pbxuO1aQradp2QwMNz9abX8ciR9zffbO1Dw2AuNPbyBA3MqNRp7ivIvJxctl3zpjyPEmpXTXXDUSdlQSlehIG9SttH2bVnCpaSJjINEpA3hTS0lhkjxKpzVxgi5xnbzoKwtC2OEnxFWiBk3Oaa2yJnfSc+NXvBDjcD60yFYti6GiGILAqGB6g8jVwgTOI8n2rLwyQgiRXXyIxTasVsrTUu+ceQ5UQjsVySMDwqlEJGdW3mM1dDz04GfSj0CyxcmiI4gBlmXfzqPG4C6SFPrzq1bWeU6dSn3pdhqNcwJ97Ye9bpPCASh389qtj4KzHvSYPgN6Lg4Ko+Zi3otBzQdWAJeknwJ2wBk/nVaWbTN3A+WO/l709TgkY3KufKjIbIRxdmi6Pekc0HX2JE4XBHpEx1Pz05xRC2YzjsE09Ap5U3h4dEG+Ug+JzRAt0T5VBHjS2MkKVtI1GyKnmBvVscKZ0jWR44pkIsDPdFa4c7AClbGF7W4YnPLptW8cWn/AFMHzozsJSdyK2+FZubj6UrYyQIy2xIMkbOR1GBWiy2itk22MdQM0yThxfZTk+oqz/JnbZ2CL6ZNCw0BC8sSM6NPljP6VKIbgcIJzcsD/wAazW/Rjx6ztWmUsFJx1AxV/ZSKRpUkedYh4lZWkgJkSFzy7N2J/CmnaQzHW0+rO+Vb+NdinF8HM4tA0Yl5GNh7VequjghQ3kRR9vIFwELMPHSCaYwPkhpxnHLKits0bVMUwzyIcrCFbkNjj8c1e8V3d4W4YuANtRO1OluI1ZGigQP0cjT/AHracXUwLGeAZ3zjc+tJvfYdBCvDX+VQDv1ouLhE4bUQBjyp3Y2eM6wmD64NMIbVVzgjHgB/GkeRjqCFFvYRxjvYJ60ySwZU1JEdPjV5jnUqI9BAbJ2G9XO12DqMUbMRzLYqdtjUkDx2cjbhe6PGrgNB0qFyBv3M1O34kc4ghYDpqreCS5Yft7YfuGmr2LZFimnXnIU6HRjNWRWJBy4GcdW/QVbFEpOTGV89W9WPbo24dvcmtwEx2YRQGaIY64JrAEB3abfyXFT4fz/GtlhxW4BbNTHaY2DufCsqIuSwLjzNWiIeFbBMVuA8migdI0H7tbhT0C/9RW6r5UNdcW4bYs4u72CFkAJV3AO+cbe1K6DTCNL42OPSq5FbzPqaG/8AkPD3tZJ4pQVUZGQRmvOftR9uuNAvFYyQwR8w8SBmI9Wz+VQfyMadJ8lVhm+0ejmHf5alfOd7xvitxcNJPf3bueZMzVKf7BdCsXNpK3ZSI6fdWQAYBH/68v68aaCOe3nSa2kMaHbDHUjCgzZwXaFiCCwwHT9RWttDd2DBFuBLH0UkkD/kprz/ALF3F0x++zpDx2aPTF8GgfA/aDJGfSrxx66SIxJBaJcaQVkdiB57ePvil3DrhLkFHh0OAcqN1YjH0PlXO8VFqtxI0NwznO6yIcg+HL+FNh+TlnPVuqEnGMVdD21+2fF7a4Zrhop8tvG6DSP+JH866S1/xA4aRme0u438E0sD7kivLzNnYN9RWVkA3Y58MHevT7XJC2j0yP8AxMCXWkcMX4fGx7Xv+vLFHQ/4lWT3Cq1myW/3mZ8uPbkfrXlAlBGFwD9asVsLuTk0tIymz28/brhYK/DRXM6kZJSNVH0JzT3h/GuH8QjD21wpOASh2ZfUV89W5lmIVzjScBy2MeApraXVzbqskk2AvMlsOaVuK4GTZ798RB/5U/7CrVZCOfOvFbS9IYtb3EkevduzkIJ9fOnNhxa8tj3bh5gdykpLY/HIo0/Y2y9HqLTQx/PIg9WFai7tj/rJ9a88uPtVbWwJnVQw5qJe8fald39t5JAU4faCMnlJN3iP3R/E0dZA2R62ZYwM6l+oqhuJ8PjbTJe2yHwaZR+teIGSa6kMlzM8jscku2akt3Z2Sg3DDmBpXBPrig1JDKSPeEmR0DoQyHkwOQaUcZ+1vBOCq/x17H2q/wCgh1SH0A/PlXgt59p7mcm3spZraHnojkIJ23zjzpWNcjE7k9Sanz5C5I7f7V/4g8Q4vdabB5bC1XGlEk77Y6kj9PCudguX7f4ieRnkbfUxyT6mkxlZW7oO3XGa2ad8fePlilkrGhKjsYeOsLCZTJ33O2/TFc7eX7sxy2x6UEJnCfKw8dqGmdido39xUo4Iplp53JG0k4LHJrFCsz5+UjyqV0aohsdPDKISuoiNjscnFGoGlUtqEh/2gEiuUv8AhN1G/aQKJ0O5IbJFNOANJDbqrwSZDDGEJ/KvOyYVpvF2PF80xnFO0VyBgb5IVxvt4eNWymKeQfFWwliI+f7y/rii45ctiXKZ6uhB+v8AGiRaR7NpTfqvd/HcVxPKou6oprYqk+ykEyh7aYx56HB/Db8zSu++z8tgMyyxEHl3tJP1roJuAG5w3x9xCoI2CAj8DVUn2XllGF4qjaDuslvuQP3vxroxfN1f5ZOP4ElhvpHM28KvIqB0XLYy2RV0kUUSbyZlzjR0x45pndcCFuoM97b4BChVjYHOefLbpSgyxTnDSjK7BxtjnzHsa74Z45OU+CLxUi5L3sZlkWNcDHdbGDijku4HjeUMEMnzRaS/j1PpSiOP4iXsY3Ltjkq5NFRcP4o4UC3VFIwGuJFj0jzBOT16U8vr8sEVL0GHtlIktJGwV5AnUuOYI61ZLxa7eIdvdaFjGAw7uB4ZFCXFhdwW7PNe2ygZBRGIYny6n28KAWZ4IXLSPgHOrAGMD1zTwypK1yCUfY4t7OabLrG7jmW0k+9aSXUMHdVg7+QOKT2nEA1uxmml1E//AF5IBHjWFQyZJZQfDIP8q0suS+QapBs3GsOqiTQDtlVyaSyvJMxbBzrbc9R0zREkSE6pCRp6860ywyELMvkMVlIxiGARHtHmAJ56N6J7ZEG4Y+bn9K0RGC5Y48NzVNzI0BXW5OrPy0t7OglhuDzA+lVPM+rIYgHl3qrSWNjiQlCeueVW9gvMsD75puF2Epads/NnxqtmJ8frRBEY3UcqokxnJopozZUWAONR/GpU0r5/WpTcGOlt1uDcE6kZWAOgj2O554o654S04zFGisSDkuRjbngGgOHLFHLm6u7JBp3VCzH64o6FrIXBeTjkoi5iNISv9/pXlZHJSuP9Mul7LbOwng0rPIkhwASrMMAHOcnH50XDM+p8TW7Mp0sNWtlHgMCt45uB5V3vHZi2AcYyfLC5q88W4Fad2NFMhOAFjJJP0rjnklL/AFbf8FVFLyULczRhpIrSRwB3cx4ZvTnTKK+hlGmaN1OnOmVMfgVpdJ9qooHMEVo4J8QAPfFLOLccubqEiWODsuWCdR32oLBPI/yjX7M8kY+RxKqswZQqR6jnUfYjG36Uru4bLS7XD9mGfJZME8tseAPjXNzdrPsNCIDzGx/D+NZHD7uQhrXvcxsevXO1d+P4+ncqIOd+Bxb2fC/h9VrcTrlt8H5yM88EHFDXtupbMchAzkBlLH6k1rZWsjroKDWObKMb+fhTy0tY43Idco679r0yOhx0zQnk0ld2KuTmOxYudEayHkoBP5VtLw+8njkJgkEUS6mXGB09fGnxMMBDmVWCjdcY/HP9e9FR8TtwuiEjWFAc8xgZ3z4/Sm/yZ9qIFFeWcObcDJwzeOoadNFLYyQohzKgZdQ1Ad4HrzrppZIA8sogGiQ7tnUD1zj2zWQOHAQyhVQqu+rGGPTb19KpL5Tfg2pzMNi8jgiZn/2omdquNuBsXwPAiuqWS0bQyHIYkMA2jJx18eZ60LLb8PEimJQwB3jZyT6569edTXyW3yjanMywyqO4NXpigpYLhmyYf/aunfh0Uyyy2zkfeWMq23iPxpa6lANaMoPLKkZrohmT6FaYnWzk3LJj3rdUcDGkj3piWUDA+mc1oxC7YFU+y+0ACCMfu/jUKN/Y0SzZXOkfWq2z0SiphBiDnYVKuMTZ3yPepTbAK44PldScE4YqCMUxhiWJ0bLyEkYZ25f16UvguQZAN8kfpW80ydpmN2ZwcAkZFTkpPgex9BJFGqCfCBjqBbIHlWrXEhBcldWsEHVkg55r9aVSXga0ASN+1ByWLZxjqPCrLWRDbq2/PLErtj61H6q5YdhvFKj3BmiMYLb4VVyfTO/96lzbLLOo0xkBS75bTqPPGD7UpsrsfFyNqVt8KdGNPntyoq7vSO0Ep1a156t08hSvHJS4A2qLVsYy5A0Ruy7IN2Bz1oqKX4YdkyFNLDc7ZHj55pEkrR3HaqxEZwCT90n+VbXHEBJgOzDcBuW4ovFJ8MGw6mvk7JiriN85H7MDTjqayt52KLMXcyAH9keZBb+H61zF3cNr5FfE5zWWmXuNkA7ZU5OfOmXx1QNmF3t0mjSinV9/BqWV4zIxMigIAO8TgjfoPzpY8svbdqmkAnYAdPOjrRDFKZ5QHSVcEHDbHkc/lVnjjGIBpHJHMWdpCZdIUkHY+ePDHlSia+nWSSQy6XD8gc596rIFukahlLEnO43HQ5H5UNI2NsYHn1rQxpGsai6dIkMmznvMc5LDlz/mar/zIvMMkjA04zkk88/1tvQSOSvMjbZcbDxFUlWgcsMjqMjmKb6ogtj214pLHpXdjuFJIPM+lMbi4S5XWzfKMas7E9dt65SKQyAE8+YNGfEGHMY7wyDkDY1KeBXaGsZvalVV20aTzxjI8qhESEl15jCgHbehmu8Ds9TaiMDH1qi7YsIXVt8BiV6E/wBClUJPswXJ2SZIGRjw5GhZJZAzAISAM4AycedWTwuxV4wANiQp1HzOPaqxNK5Cxpg4xnfDe1NGKMavNk91CB4E1KH3YnPeOdzqxUqlI1C6JsNzOcVZJMxdQrclwByxUqVfyAItmLyBNwSN9POrDKI1eSOVSgGwPP6VKlJVsILas75UHG2xq2QkSEB9R5gnOfSs1Kz7FCe1C2+lc6Sp2xnDfrS11bGc4yMkfrWalCBidqXBRmzk5ya2jXVJp2chML3sVipT+AlcmpJGVhgjOQd8U00l7USOWKRpjSvTbPPOPOpUpZ9IwGLhZHjZ1IxgE88jrWz27zTBVUAHfP8AXjUqUZfj0Dyaxowm7F5CjZAy2wFW4Lko6BgjFSy7bbVKlBvgxmfOV7IAgjJAHLrVcSs40Mue6c9CCeo/Cs1KyfAQ2CRSEWTBGfuk1rLLHpDAaSNu8P09qlSp68hMdt2inU5Bz+z8Ac5PtvQ8pOjWTv0O/eqVKKVAKe2Y9R7pUqVKqY//2Q=='
]

const width = Dimensions.get('window').width

export function Ad() {
  const [isLoading, setIsLoading] = useState(true)

  const { colors } = useTheme()
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.navigate('update')
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
      contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.gray[600] }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Header marginTop={20} marginBottom={6}>
          {''}
        </Header>

        <Carousel
          loop
          data={images}
          width={width}
          height={320}
          autoPlay={images.length > 1}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <Image
              width="full"
              height={80}
              source={{ uri: item }}
              alt="Ad Image"
              resizeMode="cover"
              borderColor="gray.400"
              borderWidth={1}
            />
          )}
        />

        <VStack padding={6}>
          <HStack style={{ gap: 6, marginBottom: 24 }} alignItems="center">
            <Image
              width={9}
              height={9}
              source={{
                uri: 'https://avatars.githubusercontent.com/u/19474041?v=4'
              }}
              alt="Vendedor"
              borderWidth={2}
              borderRadius="full"
              borderColor="blue.500"
            />

            <Text color="gray.200" fontSize={18}>
              Luciano Tavernard
            </Text>
          </HStack>

          <TouchableOpacity
            style={{
              width: 80,
              borderRadius: 20,
              marginBottom: 8,
              paddingVertical: 2,
              paddingHorizontal: 8,
              backgroundColor: colors.gray[500]
            }}
          >
            <Heading
              color="gray.200"
              textTransform="uppercase"
              textAlign="center"
              fontSize={16}
            >
              Usado
            </Heading>
          </TouchableOpacity>

          <VStack>
            <HStack
              style={{ gap: 8 }}
              width="full"
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading color="gray.100" fontSize={20} fontFamily="heading">
                Luminária pendente
              </Heading>

              <Text color="blue.500" fontFamily="heading">
                R$
                <Heading color="blue.500" fontSize={20} fontFamily="heading">
                  45,00
                </Heading>
              </Text>
            </HStack>

            <Text marginBottom={8} color="gray.300">
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
              Vitae ante leo eget maecenas urna mattis cursus.
            </Text>

            <Heading
              marginBottom={4}
              color="gray.300"
              fontSize={14}
              fontFamily="heading"
            >
              Aceita troca? <Text fontFamily="body">Sim</Text>
            </Heading>
          </VStack>

          <VStack style={{ gap: 4 }}>
            <Heading
              marginBottom={2}
              color="gray.300"
              fontSize={14}
              fontFamily="heading"
            >
              Meios de Pagamento:
            </Heading>

            <PaymentMethods
              methods={['boleto', 'pix', 'deposit', 'card']}
              color={colors.gray[200]}
            />
          </VStack>

          <VStack style={{ gap: 4 }} marginTop={6}>
            <Button icon={<Power />} variant="secondary" onPress={handleGoBack}>
              Desativar anúncio
            </Button>

            <Button icon={<TrashSimple />}>Excluir anúncio</Button>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
