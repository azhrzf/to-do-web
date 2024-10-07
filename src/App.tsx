import "@fontsource/nunito-sans";
import DialogWrapper from "./components/DialogWrapper";
import AddTodo from "./components/AddTodo";
import TodoWrapper from "./components/TodoWrapper";
import { AppProvider } from "./context/AppContext";
import { IoMdAddCircle } from "react-icons/io";

const AddConfig: React.FC = () => {
  return (
    <div className="button-basic primary-link-bg basic-flex-middle">
      <IoMdAddCircle />
      <p>Add</p>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="wrapper">
        <header className="main__header">
          <nav className="navbar">
            <h1>To Do Web</h1>
          </nav>
        </header>
        <main className="main__body">
          <DialogWrapper buttonConfig={<AddConfig />}>
            <AddTodo />
          </DialogWrapper>
          <TodoWrapper />
        </main>
      </div>
    </AppProvider>
  );
}
