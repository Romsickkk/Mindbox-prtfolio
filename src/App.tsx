import React, { useState, useEffect } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "all"
      ? true
      : filter === "active"
      ? !todo.completed
      : todo.completed
  );

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        todos
      </h1>
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-6">
        <div className="flex space-x-2">
          <input
            type="text"
            className="w-full p-3 border-b border-gray-300 focus:outline-none text-lg"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            onClick={addTodo}
            className="cursor-pointer px-4 py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow-md w-1/3"
          >
            Add
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-md ${
                todo.completed ? "text-gray-400 line-through" : "text-black"
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-3 w-5 h-5"
              />
              <span className="flex-1 text-lg">{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="cursor-pointer text-red-500 text-xl"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-700 text-sm">
          <span>
            {todos.filter((todo) => !todo.completed).length} items left
          </span>
          <div className="flex space-x-2 my-2 sm:my-0">
            <button
              onClick={() => setFilter("all")}
              className={`cursor-pointer px-3 py-1 rounded-lg text-sm font-semibold ${
                filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`cursor-pointer px-3 py-1 rounded-lg text-sm font-semibold ${
                filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`cursor-pointer px-3 py-1 rounded-lg text-sm font-semibold ${
                filter === "completed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={clearCompleted}
            className="cursor-pointer text-red-500 font-semibold"
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
