import { cva } from 'class-variance-authority'
import $Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { ElementState } from 'types'

type Props = Omit<ImageProps, 'src' | 'alt'> & { src: string; alt?: string }

const classes = cva('object-center transition duration-500', {
  variants: { state: { error: '', loading: 'opacity-0 blur-lg scale-90', success: 'opacity-100 blur-none scale-100' } },
})

export default function Image({ src, alt = '', className, ...rest }: Props) {
  const $src = src.includes('http') || src.includes('data:') ? src : `/images/${src}`
  const [state, setState] = useState<Exclude<ElementState, 'disable'>>('loading')

  const size = rest.fill ? undefined : { width: 1000, height: 1000 }

  return <$Image alt={alt} src={$src} {...size} quality={85} className={classes({ state, className })} onLoadingComplete={() => setState('success')} {...rest} />
}

// Note: Image component prefix `/images` src for relative path. So `src="$name.png"` will fetch image under /public/images/$name.png
// Note: By prefixing we lose the ability to use static import images.
