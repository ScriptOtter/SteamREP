import { useState } from "react";
import z from "zod";

export const useFormValidation = (
  formData: Partial<Record<string, any>>,
  formDataScheme: z.ZodSchema
) => {
  const [showErrors, setShowErrors] = useState(false);

  const validate = () => {
    const res = formDataScheme.safeParse(formData);
    if (res.success) {
      return undefined;
    }
    return res.error.format();
  };

  const handleValidation = () => {
    const errors = validate();
    if (errors) {
      setShowErrors(true);
      return errors;
    }
    setShowErrors(false);
    return undefined;
  };

  return {
    showErrors,
    handleValidation,
  };
};
