import { useRouter } from 'next/router'
import { Fragment, ReactNode, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { tokenState } from 'states'
import Footer from './Footer'
import Header from './Header'

const restricts = {
  //When logged-in we restrict these paths
  user: ['/login', '/signup'],
  //When not-logged-in we restrict these paths
  guest: ['/account'],
}

export default function AppRoot({ children }: { children: ReactNode }) {
  const token = useRecoilValue(tokenState)
  const router = useRouter()

  // Route restrictions are handled here
  useEffect(() => {
    const timeout = setTimeout(() => {
      const type = !!token ? 'guest' : 'user'
      restricts[type].forEach(path => router.pathname.includes(path) && router.replace('/'))
    })
    return clearTimeout(timeout)
  }, [token, router.pathname])

  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  )
}
