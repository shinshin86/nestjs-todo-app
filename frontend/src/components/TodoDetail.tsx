import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./TodoDetail.module.css";

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const TodoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    try {
      const response = await fetch(`/api/todos/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch todo");
      }
      const data: Todo = await response.json();
      setTodo(data);
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  };

  if (!todo) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{todo.title}</h1>
      {todo.description && (
        <p className={styles.description}>Description: {todo.description}</p>
      )}
      <p className={styles.status}>
        Status:{" "}
        <span
          className={todo.completed ? styles.completed : styles.notCompleted}
        >
          {todo.completed ? "Completed" : "Not Completed"}
        </span>
      </p>
      <Link to="/" className={styles.backLink}>
        Back to List
      </Link>
    </div>
  );
};

export default TodoDetail;
