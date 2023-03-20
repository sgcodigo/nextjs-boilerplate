import { useRouter } from 'next/router'
import { Fragment, ReactNode, useEffect } from 'react'
import { useRecoilValue,useSetRecoilState } from 'recoil'
import { tokenState ,isClientSideState} from 'states'
import Footer from './Footer'
import Header from './Header'

const routes = {
  // Header & Footer will be hidden
  bare: ['/verify'],
  // Redirect to index.tsx if user is logged.
  guest: ['/login', '/signup'],
  // Redirect to index.tsx if user isn't logged
  private: ['/account'],
}

export default function AppRoot({ children }: { children: ReactNode }) {
  const token = useRecoilValue(tokenState)
  const setClientSide = useSetRecoilState(isClientSideState)
  const router = useRouter()
  const isBareRoute = routes.bare.find(r => r === router.asPath)

  // Needed to prevent hydration error.
  useEffect(() => {
    setClientSide(true)
  }, [])

  // Redirects are handled in this effect
  useEffect(() => {
    const type = !!token ? 'guest' : 'private'
    routes[type].forEach(path => router.pathname.includes(path) && router.replace('/'))
  }, [token, router.pathname])

  return (
    <Fragment>
      {!isBareRoute && <Header />}
      {children}
      {!isBareRoute && <Footer />}
    </Fragment>
  )
}
