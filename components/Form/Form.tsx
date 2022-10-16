import { yupResolver } from '@hookform/resolvers/yup'
import { useMutateQuery } from 'hooks/useQuery'
import { HTMLProps, ReactNode } from 'react'
import { FormProvider, useForm, UseFormReturn, UseFormSetValue } from 'react-hook-form'
import type { Request, Response, ResponseError } from 'types/api'
import { AnyObjectSchema, object } from 'yup'

type Props = Omit<HTMLProps<HTMLFormElement>, 'children'> & {
  url?: string
  schema?: AnyObjectSchema
  config?: Request
  children: ReactNode | ((arg: UseFormReturn & { values: any }) => ReactNode)
  defaults?: object
  transform?: (v: any) => object
  onError?: OnError
  onSubmit?: OnSubmit
  onSuccess?: OnSuccess
}

type OnError = (err: ResponseError & { values: any; setError: (name: never, msg: string) => void; setValue: UseFormSetValue<any> }) => void

type OnSubmit = (values: any) => void

type OnSuccess = (res: Response & { values: any }) => void

const Form = ({ url, config, schema = object({}), defaults, children, transform, onError, onSubmit, onSuccess, ...rest }: Props) => {
  const form = useForm({ resolver: yupResolver(schema), defaultValues: defaults, mode: 'onChange' })
  const { mutate } = useMutateQuery()

  const handleSubmit: OnSubmit = values => {
    // If !url then onSubmit will be triggered (line:58).
    // So it's important to set url or onSubmit.
    if (url) {
      const newValues = !!transform ? transform(values) : values
      mutate(
        { url, payload: newValues, ...config },
        {
          onError: err => {
            onError &&
              onError({
                ...err,
                values,
                setValue: form.setValue,
                setError: (name: never, message: string) => form.setError(name, { type: 'validate', message }),
              })
          },
          onSuccess: res => {
            onSuccess && onSuccess({ ...res, values })
          },
        }
      )
    }
  }

  return (
    <FormProvider {...form}>
      <form {...rest} onSubmit={form.handleSubmit(onSubmit || handleSubmit)}>
        {typeof children === 'function' ? children({ ...form, values: form.getValues() }) : children}
      </form>
    </FormProvider>
  )
}

export default Form
