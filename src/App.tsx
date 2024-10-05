import "@fontsource/nunito-sans";
import TodoItem from "./components/TodoItem";

export default function App() {
  const dummyDate = new Date("2024-12-01");

  return (
    <div className="wrapper">
      <header className="main__header">
        <nav className="navbar">
          <h1>To Do Web</h1>
          <div>
            <button>Log Out</button>
          </div>
        </nav>
      </header>
      <main className="main__body">
        <div className="todo__wrapper">
          <h2>All To Do</h2>
          <div className="todo__wrapper_grid">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => (
              <TodoItem
                key={item}
                id={item.toString()}
                title="Lorem Ipsum Dolor "
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae repudiandae ad nesciunt optio sequi."
                status="inProgress"
                dueDate={dummyDate}
                labelId="1"
                userId="1"
              />
            ))}
          </div>
        </div>
        <div className="todo__wrapper">
          <h2>In Progress</h2>
          <div className="todo__wrapper_grid">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => (
              <TodoItem
                key={item}
                id={item.toString()}
                title="Lorem Ipsum Dolor"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae repudiandae ad nesciunt optio sequi."
                status="completed"
                dueDate={dummyDate}
                labelId="1"
                userId="1"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
