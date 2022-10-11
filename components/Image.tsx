import $Image, { ImageProps } from 'next/future/image';
import { useState } from 'react';

type Props = Omit<ImageProps, 'src' | 'alt'> & { src: string; alt?: string; fill?: boolean };

export default function Image({ src, alt = '', fill, className, ...rest }: Props) {
  const $src = src.includes('http') || src.includes('data:') ? src : `/images/${src}`;
  const [isLoaded, setLoaded] = useState(false);

  return (
    <$Image
      {...rest}
      alt={alt}
      src={$src}
      width={9999}
      height={9999}
      quality={100}
      className={`object-cover object-center transition-opacity ${fill && 'absolute inset-0 h-full w-full'} 
      ${isLoaded ? 'opacity-1 blur-none' : 'opacity-0 blur-xl'} ${className}`}
      onLoadingComplete={() => setLoaded(true)}
    />
  );
}

// Note: Image component prefix `/images` src for relative path.
// E.g. /public/images/$name.png -> src="$name.png"
