interface SearchTodoProps {
  searchValue: string;
  handleTodosSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchTodo: React.FC<SearchTodoProps> = ({
  searchValue,
  handleTodosSearch,
}) => {
  return (
    <div className="input__form_input">
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        placeholder="🔍 Search..."
        value={searchValue}
        onChange={handleTodosSearch}
        name="search"
        id="search"
      />
    </div>
  );
};

export default SearchTodo;
