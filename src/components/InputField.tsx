import React, { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  textarea?: boolean;
  fontSize?: string;
};

export const InputField: React.FC<Props> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextarea = Input;

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} w="100%">
      <FormLabel style={{ fontWeight: 600 }} htmlFor={field.name}>
        {label}
      </FormLabel>
      <InputOrTextarea
        {...field}
        {...props}
        id={field.name}
        w="100%"
        background="white"
        color="black"
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
