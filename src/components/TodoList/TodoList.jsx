import React, { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

const TodoList = ({ filter }) => {
  const [todos, setTodos] = useState(() => readTodosFromLocalStorage()); // 보충 공부 필요

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };

  // const handleUpdate = (updated) => {
  //   setTodos(todos.map((item) => (item.id === updated.id ? updated : item)));
  // };

  const handleUpdate = (updated) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleDelete = (deleted) => {
    setTodos(todos.filter((item) => item.id !== deleted.id));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filtered = getFilteredItems(todos, filter);

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            id={item.id}
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

function readTodosFromLocalStorage() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos, filter) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
