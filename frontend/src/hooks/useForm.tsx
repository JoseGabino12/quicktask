import { ChangeEvent, useState } from 'react';

type FormState<T> = {
  [K in keyof T]: T[K];
};

export const useForm = <T extends Record<string, unknown>> (initialForm: T) => {
  const [formState, setFormState] = useState<FormState<T>>(initialForm);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
};
