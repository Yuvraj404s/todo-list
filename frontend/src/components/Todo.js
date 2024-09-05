// src/components/Todo.js

import React, { useState } from 'react';
import axios from 'axios';

const Todo = ({ todo, deleteTodo, refreshTodos }) => {
  const [completed, setCompleted] = useState(todo.completed);

  const handleToggle = async () => {
    try {
      const updatedTodo = { ...todo, completed: !completed };
      // Simulate toggling completed status locally without backend interaction
      setCompleted(!completed);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className={`TodoItem ${completed ? 'completed' : ''}`}>
      <span className={completed ? 'green-text' : ''}>{todo.title}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      {!completed && (
        <button onClick={handleToggle}>Mark Complete</button>
      )}
    </div>
  );
};

export default Todo;
