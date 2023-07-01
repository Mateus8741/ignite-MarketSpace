import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'

type TextareaProps = IInputProps & {
  error?: string
}

export function Textarea({ error, isInvalid, ...rest }: TextareaProps) {
  const invalid = !!error || isInvalid

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        multiline
        height={160}
        paddingX={4}
        borderWidth={0}
        borderRadius={8}
        numberOfLines={5}
        backgroundColor="gray.700"
        fontFamily="body"
        fontSize="md"
        color="gray.200"
        placeholderTextColor="gray.400"
        isInvalid={invalid}
        _invalid={{ borderWidth: 1, borderColor: 'red.500' }}
        _focus={{
          borderWidth: 1,
          borderColor: 'blue.300',
          backgroundColor: 'gray.700'
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
