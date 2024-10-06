import { useState } from "react";

export function useForm(initialState: { [key: string]: string }) {
  const [state, setState] = useState(initialState);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCertainChange = (name: string, value: string) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setState(initialState);
  };

  return {
    state,
    handleChange,
    handleCertainChange,
    handleReset,
  };
}
