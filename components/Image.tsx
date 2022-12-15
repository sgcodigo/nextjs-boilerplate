import $Image, { ImageProps } from 'next/future/image';
import { useState } from 'react';

type Props = Omit<ImageProps, 'src' | 'alt'> & { src: string; alt?: string; fill?: boolean };

export default function Image({ src, alt = '', fill, className, ...rest }: Props) {
  const $src = src.includes('http') || src.includes('data:') ? src : `/images/${src}`;
  const [isLoaded, setLoaded] = useState(false);

  return (
    <$Image
      alt={alt}
      src={$src}
      width={1000}
      height={1000}
      quality={100}
      className={`object-center transition-all ${fill && 'absolute inset-0 h-full w-full'} ${isLoaded ? 'opacity-1 blur-none' : 'opacity-0 blur-xl'} ${className}`}
      onLoadingComplete={() => setLoaded(true)}
      {...rest}
    />
  );
}

// Note: Image component prefix `/images` src for relative path. So `src="$name.png"` will fetch image under /public/images/$name.png
// Note: By prefixing we lose the ability to use static import images.