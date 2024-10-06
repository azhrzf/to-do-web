import { useState } from "react";

export function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    value,
    handleChange,
  };
}

export default useInput;
