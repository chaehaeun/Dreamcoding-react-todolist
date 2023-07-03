import React, { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: "123", text: "장보기", status: "active" },
    { id: "124", text: "공부하기", status: "active" },
  ]);

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleUpdate = (updated) => {
    setTodos(todos.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleDelete = (deleted) => {
    setTodos(todos.filter((item) => item.id !== deleted.id));
  };

  return (
    <section>
      <ul>
        {todos.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
};

export default TodoList;
