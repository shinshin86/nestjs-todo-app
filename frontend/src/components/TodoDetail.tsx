import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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
        throw new Error('Failed to fetch todo');
      }
      const data: Todo = await response.json();
      setTodo(data);
    } catch (error) {
      console.error('Error fetching todo:', error);
    }
  };

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{todo.title}</h1>
      {todo.description && <p>Description: {todo.description}</p>}
      <p>Status: {todo.completed ? 'Completed' : 'Not Completed'}</p>
      <Link to="/">Back to List</Link>
    </div>
  );
};

export default TodoDetail;