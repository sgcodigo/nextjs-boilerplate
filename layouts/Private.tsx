import { HTMLAttributes } from 'react'
import { useRecoilValue } from 'recoil'
import { tokenState } from 'states'

type Props = HTMLAttributes<HTMLElement> & {}

export default function Private({ children, ...rest }: Props) {
  const token = useRecoilValue(tokenState)
  return <main {...rest}>{!!token ? children : null}</main>
}

// Note: All private routes must be wrapped with Private.
