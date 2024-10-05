import { useState } from "react";

export function useInput(initialState: { [key: string]: string }) {
  const [state, setState] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    state,
    handleChange,
  };
}
