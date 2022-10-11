import useField from 'hooks/useField'
import { FieldCommonProps } from 'types'
import Label from './Label'

type Props = FieldCommonProps & {}

export default function Textarea({ name, label, className, placeholder }: Props) {
  const { value, onChange } = useField(name)

  return (
    <fieldset className={`w-full ${className}`}>
      <Label name={name}>{label}</Label>
      <textarea name={name} value={value} placeholder={placeholder} className='outline-none' onChange={e => onChange(e.target.value)} />
    </fieldset>
  )
}
