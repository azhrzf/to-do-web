import { useContext } from "react";
import { AppContext, type AppContextProps } from "@/context/AppContext";

export function useApp(): AppContextProps {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
