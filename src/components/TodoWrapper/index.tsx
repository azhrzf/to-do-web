import TodoItem from "../TodoItem";

export default function TodoWrapper() {
  const dummyDate = new Date("2026-12-01");

  return (
    <>
      <div className="todo__wrapper">
        <h2>In Progress</h2>
        <div className="todo__wrapper_grid">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => (
            <TodoItem
              key={item}
              id={item.toString()}
              title="Lorem Ipsum Dolor"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae repudiandae ad nesciunt optio sequi."
              isCompleted={false}
              dueDate={dummyDate}
              labelSlug="1"
              userId="1"
            />
          ))}
        </div>
      </div>
      <div className="todo__wrapper">
        <h2>Completed</h2>
        <div className="todo__wrapper_grid">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => (
            <TodoItem
              key={item}
              id={item.toString()}
              title="Lorem Ipsum Dolor"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae repudiandae ad nesciunt optio sequi."
              isCompleted={true}
              dueDate={dummyDate}
              labelSlug="1"
              userId="1"
            />
          ))}
        </div>
      </div>
    </>
  );
}
