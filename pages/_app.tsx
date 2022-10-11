import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppRoot from 'layouts/AppRoot'
import PopupCenter from 'layouts/PopupCenter'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import 'styles/globals.css'

const queryClient = new QueryClient({ defaultOptions: { queries: { keepPreviousData: true } } })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AppRoot>
          <Component {...pageProps} />
        </AppRoot>
        <PopupCenter />
      </RecoilRoot>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
