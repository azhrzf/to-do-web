import { useState } from "react";
import "@fontsource/nunito-sans";
import AddTodo from "./components/AddTodo";
import TodoWrapper from "./components/TodoWrapper";
import { AppProvider } from "./context/AppContext";

export default function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <AppProvider>
      <div className="wrapper">
        <header className="main__header">
          <nav className="navbar">
            <h1>To Do Web</h1>
            <div>
              <button onClick={openDialog}>Open Dialog</button>
              {isDialogOpen && (
                <div className="dialog">
                  <div className="dialog-content">
                    <AddTodo />
                    <button onClick={closeDialog}>Close</button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>
        <main className="main__body">
          <AddTodo />
          <TodoWrapper />
        </main>
      </div>
    </AppProvider>
  );
}
