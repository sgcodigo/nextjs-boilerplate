import { useMediaQuery } from '@mantine/hooks'

export const useResponsive = () => {
  const isTabletOrMobile = useMediaQuery('only screen and (max-width: 768px)')

  return { isTabletOrMobile }
}

export default useResponsive
