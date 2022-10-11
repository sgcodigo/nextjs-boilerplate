import useField from 'hooks/useField'
import { FieldCommonProps } from 'types'
import Label from './Label'

type Props = FieldCommonProps & {}

export default function Input({ name, label, className }: Props) {
  const { value, onChange } = useField(name)

  return (
    <fieldset className={`w-full ${className}`}>
      <Label name={name} size='sm'>
        {label}
      </Label>
      <input name={name} value={value} className='w-full rounded-[4px] border p-4 text-sm outline-none' onChange={e => onChange(e.target.value)} />
    </fieldset>
  )
}
