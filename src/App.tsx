import "@fontsource/nunito-sans";
import DialogWrapper from "./components/DialogWrapper";
import AddTodo from "./components/AddTodo";
import TodoWrapper from "./components/TodoWrapper";
import { AppProvider } from "./context/AppContext";
import { IoMdAddCircle } from "react-icons/io";

export default function App() {
  const addTodoButtonConfig = {
    name: "Add To Do",
    icon: <IoMdAddCircle />,
  };

  return (
    <AppProvider>
      <div className="wrapper">
        <header className="main__header">
          <nav className="navbar">
            <h1>To Do Web</h1>
          </nav>
        </header>
        <main className="main__body">
          <DialogWrapper buttonConfig={addTodoButtonConfig}>
            <AddTodo />
          </DialogWrapper>
          <TodoWrapper />
        </main>
      </div>
    </AppProvider>
  );
}
