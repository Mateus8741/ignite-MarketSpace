import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'

type InputProps = IInputProps & {
  error?: string
}

export function Input({ error, isInvalid, ...rest }: InputProps) {
  const invalid = !!error || isInvalid

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        minHeight={14}
        paddingX={4}
        borderWidth={0}
        borderRadius={8}
        backgroundColor="gray.700"
        fontFamily="body"
        fontSize="md"
        color="gray.200"
        placeholderTextColor="gray.400"
        isInvalid={invalid}
        _invalid={{ borderWidth: 1, borderColor: 'red.500' }}
        _focus={{
          bgColor: 'gray.700',
          borderWidth: 1,
          borderColor: 'blue.default'
        }}
        {...rest}
      />

      {error && (
        <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
          {error}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  )
}
