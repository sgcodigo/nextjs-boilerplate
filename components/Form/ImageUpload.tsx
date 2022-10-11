import Image from 'components/Image'
import useField from 'hooks/useField'
import { ChangeEventHandler, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldCommonProps } from 'types'
import { toBase64 } from 'utils/image'
import Label from './Label'

type Props = FieldCommonProps & { max?: number }

export default function ImageUpload({ max = 1, name, label, className }: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const { setError } = useFormContext()
  const { value: images, onChange } = useField<string[]>(name, { $default: [] })
  const length: number = images.length

  const handleError = (msg: string) => setError(name, { message: msg })

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const files = e.target.files
    if (!!files) {
      if (files.length + length > max) return handleError(`You can only upload maximum ${max} files.`)
      Promise.all(Array.from(files).map(toBase64))
        .then(newImages => onChange([...images, ...newImages]))
        .catch(err => handleError(err))
    }
  }

  const cardClass = 'm-2.5 h-24 w-24 md:m-1.5 md:h-[5.75rem] md:w-[5.75rem]'

  return (
    <fieldset className={`w-full ${className}`}>
      <Label id={name}>{label}</Label>
      <input key={length} ref={ref} hidden type='file' multiple={max > 1} name={name} onChange={handleChange} />
      <ul className='-m-3 flex flex-wrap md:-m-1.5'>
        {length < max && (
          <li
            className={`flex cursor-pointer items-center justify-center rounded-lg border border-grey-light border-opacity-30 shadow-md ${cardClass}`}
            onClick={() => ref.current?.click()}
          >
            Add Image Button
          </li>
        )}
        {images.map((image, i) => (
          <li key={i} className={`relative ${cardClass}`}>
            <Image fill alt='' src={image} className='rounded-lg' />
          </li>
        ))}
      </ul>
    </fieldset>
  )
}
