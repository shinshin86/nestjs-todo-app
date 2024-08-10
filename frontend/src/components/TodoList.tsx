import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button onClick={createTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo.id, !todo.completed)}
            />
            <Link to={`/todo/${todo.id}`}>{todo.title}</Link>
            {todo.description && <span> - {todo.description}</span>}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;