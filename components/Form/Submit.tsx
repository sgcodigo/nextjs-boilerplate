import Button, { ButtonProps } from 'components/Button'
import { useFormContext } from 'react-hook-form'

export default function Submit({ label, ...rest }: ButtonProps) {
  const { formState } = useFormContext()
  return <Button type='submit' label={label} state={!formState.isValid ? 'disable' : 'normal'} {...rest} />
}
