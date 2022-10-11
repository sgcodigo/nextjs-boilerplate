import { HTMLProps, ReactNode } from 'react';

export type ElementSize = 'sm' | 'md' | 'lg';

export type ElementState = '' | 'loading' | 'disable' | 'error';

export type FieldCommonProps = HTMLProps<HTMLFieldSetElement> & { label: string; name: string };

export type Popup = HTMLProps<HTMLDivElement> & { children?: ReactNode | ((args: { onClose: Function }) => ReactNode) };
