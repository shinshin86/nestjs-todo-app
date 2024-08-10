import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './TodoList.module.css';

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  
    useEffect(() => {
      fetchTodos();
    }, []);
  
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
  
    const createTodo = async () => {
      try {
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo),
        });
        if (!response.ok) {
          throw new Error('Failed to create todo');
        }
        setNewTodo({ title: '', description: '' });
        fetchTodos();
      } catch (error) {
        console.error('Error creating todo:', error);
      }
    };
  
    const updateTodo = async (id: number, completed: boolean) => {
      try {
        const response = await fetch(`/api/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed }),
        });
        if (!response.ok) {
          throw new Error('Failed to update todo');
        }
        fetchTodos();
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    };
  
    const deleteTodo = async (id: number) => {
      try {
        const response = await fetch(`/api/todos/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete todo');
        }
        fetchTodos();
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          className={styles.input}
        />
        <button onClick={createTodo} className={styles.button}>Add Todo</button>
      </div>
      <ul className={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo.id, !todo.completed)}
              className={styles.checkbox}
            />
            <div className={styles.todoContent}>
              <Link to={`/todo/${todo.id}`} className={styles.todoTitle}>{todo.title}</Link>
              {todo.description && <span className={styles.todoDescription}>{todo.description}</span>}
            </div>
            <button onClick={() => deleteTodo(todo.id)} className={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;