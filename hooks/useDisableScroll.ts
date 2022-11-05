import { RefObject, useEffect } from 'react'

// Used to hide the scrollbar of a target element(default `body`).
// Eg. When open a modal or aside contact form, we don't want to show two scrollbars. So hide the body scrollbar using this hook

export default function useDisableScroll(disable: boolean, target?: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = target?.current || document.body
    element.style.overflow = disable ? 'hidden' : ''
  }, [target, disable])
}