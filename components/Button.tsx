import classNames from 'classnames'
import Spinner from 'components/Spinner'
import Link from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ElementState } from 'types'
import { cssvars } from 'utils'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  $ref?: any
  href?: string
  icon?: ReactNode
  color?: string
  label?: ReactNode
  state?: ElementState
  inline?: boolean
  variant?: 'text' | 'primary' | 'secondary' | 'transparent'
}

const Button = ({
  $ref,
  icon,
  href,
  color,
  label,
  state = '',
  inline = true,
  variant = 'primary',
  className,
  onClick,
  ...rest
}: Props) => {
  const props = {
    style: cssvars({ color }),
    className: classNames(
      'rounded-full text-white font-bold flex justify-center items-center border border-trans bg-primary',
      { 'text-xs px-5 h-7': inline },
      { 'text-sm px-8 h-16': !inline }
    ),
  }

  const child =
    state === 'loading' ? (
      <Spinner color='currentColor' />
    ) : (
      <>
        {icon}
        {!!label && <span className=''>{label}</span>}
      </>
    )

  return !!href ? (
    <Link ref={$ref} href={href} {...props}>
      {child}
    </Link>
  ) : (
    <button ref={$ref} onClick={e => state === '' && !!onClick && onClick(e)} {...rest} {...props}>
      {child}
    </button>
  )
}

export default Button
