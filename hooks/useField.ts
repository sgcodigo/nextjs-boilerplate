import { useController } from 'react-hook-form'

type Option = { $default?: any }

export default function useField<TValue = string>(name: string, { $default = '' }: Option = {}) {
  const {
    field: { ref, value, onChange },
    fieldState: { error },
  } = useController({ name, defaultValue: $default })

  const val: TValue = value

  return { ref, value: val, error: error?.message, onChange }
}
