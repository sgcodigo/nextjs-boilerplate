import classNames from 'classnames'
import { HTMLProps } from 'react'
import { ElementSize } from 'types'

type Props = Omit<HTMLProps<HTMLLabelElement>, 'size'> & { size?: ElementSize }

export default function Label({ name, size = 'md', className, ...rest }: Props) {
  return <label htmlFor={name} className={classNames('block', { 'mb-2 text-xs': size === 'sm', 'mb-4 text-sm font-bold md:mb-5': size === 'md' })} {...rest} />
}
