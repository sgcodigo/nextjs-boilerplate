import useField from 'hooks/useField';
import { FieldCommonProps } from 'types';
import Label from './Label';

type Props = FieldCommonProps & {};

export default function Input({ name, label, className }: Props) {
  const { value, setValue } = useField(name);

  return (
    <fieldset className={`w-full ${className}`}>
      <Label name={name} size="sm">
        {label}
      </Label>
      <input name={name} value={value} className="outline-none" onChange={e => setValue(e.target.value)} />
    </fieldset>
  );
}