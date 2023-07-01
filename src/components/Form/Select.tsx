import { Select as SelectNativeBase, ISelectProps } from 'native-base'

type SelectProps = ISelectProps & {
  items: Array<{ label: string; value: string }>
}

export function Select({ items, ...rest }: SelectProps) {
  return (
    <SelectNativeBase
      minWidth="110"
      color="gray.300"
      _selectedItem={{
        borderColor: 'blue.light',
        borderWidth: 1,
        borderRadius: 8
      }}
      {...rest}
    >
      {items.map((item) => (
        <SelectNativeBase.Item
          key={item.value}
          label={item.label}
          value={item.value}
        />
      ))}
    </SelectNativeBase>
  )
}
