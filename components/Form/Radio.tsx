import * as RadioGroup from '@radix-ui/react-radio-group'
import useField from 'hooks/useField'
import { FieldCommonProps } from 'types'
import Label from './Label'

type Props = FieldCommonProps & { options: { label: string; value: string }[] }

export default function Radio({ name, label, options, className }: Props) {
  const { value, onChange } = useField(name, { $default: options[0].value })

  console.log(value)

  return (
    <fieldset className={`w-full ${className}`}>
      <Label name={name}>{label}</Label>
      <RadioGroup.Root name={name} value={value} className='grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4' onValueChange={onChange}>
        {options.map(({ value, label }) => (
          <RadioGroup.Item key={value} value={value} className='rounded-lg bg-white py-4 text-center text-sm shadow-heavy rdx-state-checked:bg-gold rdx-state-checked:text-white rdx-state-checked:shadow-none'>
            {label}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </fieldset>
  )
}
