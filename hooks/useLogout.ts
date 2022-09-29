import { useRouter } from 'next/router'
import { useResetRecoilState } from 'recoil'
import { tokenState } from 'states'

export default function useLogout() {
  const router = useRouter()
  const resetToken = useResetRecoilState(tokenState)
  return () => {
    resetToken()
    router.replace('/')
  }
}
