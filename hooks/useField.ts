import { useController } from 'react-hook-form'

export default function useField(name: string) {
  const {
    field: { ref, value, onChange },
    fieldState: { error },
  } = useController({ name })

  const handleChange = (value: any) => {
    onChange(value)
  }

  return { ref, value, error: error?.message, onChange: handleChange }
}
