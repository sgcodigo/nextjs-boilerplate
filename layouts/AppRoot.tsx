import { useRouter } from 'next/router'
import { Fragment, ReactNode, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { tokenState } from 'states'
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
  const router = useRouter()
  const isBareRoute = routes.bare.find(r => r === router.asPath)

  // Redirects are handled in this effect
  useEffect(() => {
    // I forgot why used `setTimeout`, but it's necessary. If u wanna know why, remove it and u will know :3.
    const timeout = setTimeout(() => {
      const type = !!token ? 'guest' : 'private'
      routes[type].forEach(path => router.pathname.includes(path) && router.replace('/'))
    })
    return clearTimeout(timeout)
  }, [token, router.pathname])

  return (
    <Fragment>
      {!isBareRoute && <Header />}
      {children}
      {!isBareRoute && <Footer />}
    </Fragment>
  )
}
