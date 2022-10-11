import classNames from 'classnames';
import Spinner from 'components/Spinner';
import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ElementSize, ElementState } from 'types';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  $ref?: any;
  size?: ElementSize;
  href?: string;
  icon?: ReactNode;
  label?: ReactNode;
  state?: ElementState;
  inline?: boolean;
  variant?: 'text' | 'primary' | 'secondary' | 'transparent';
};

const Button = ({
  $ref,
  href,
  size = 'md',
  icon,
  label,
  state = '',
  variant = 'primary',
  className,
  ...rest
}: Props) => {
  const props = {
    className: classNames(
      'uppercase flex justify-center items-center leading-none border',
      { 'text-xs px-4 h-9': size === 'sm' },
      { 'text-sm px-8 h-[3.25rem]': size === 'md' },
      { 'border-grey-darker': variant === 'secondary' },
      { 'text-white border-primary bg-primary font-bold': variant === 'primary' },
      { '!bg-inactive !border-inactive': state === 'disable' },
      className,
    ),
  };

  const child =
    state === 'loading' ? (
      <Spinner color="currentColor" />
    ) : (
      <>
        {icon}
        {<span>{label}</span>}
      </>
    );

  return !!href ? (
    <Link ref={$ref} href={href} {...props}>
      {child}
    </Link>
  ) : (
    <button ref={$ref} disabled={state === 'disable' || state === 'loading'} {...rest} {...props}>
      {child}
    </button>
  );
};

export default Button;
