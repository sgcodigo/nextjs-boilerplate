import { cssvars } from 'utils'

type Props = {
  size?: string
  path?: string
  style?: object
  color?: string
  border?: string
  className?: string
}

export default function Spinner({ size = '1.25rem', style, className }: Props) {
  return (
    <svg
      style={{ ...cssvars({ size }), ...style }}
      viewBox='0 0 24 24'
      className='animate-spin w-[var(--size)] h-[var(--size)] text-white fill-none'
    >
      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' stroke-width='4' />
      <path
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        fill='currentColor'
        className='opacity-75'
      />
    </svg>
  )
}
