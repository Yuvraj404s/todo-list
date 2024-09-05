// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import axios from 'axios';
import '../index.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await axios.post('http://localhost:8080/api/todos', todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      await axios.put(`http://localhost:8080/api/todos/${id}`, updatedTodo);
      const updatedTodos = todos.map(todo => (todo.id === id ? updatedTodo : todo));
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo', error);
    }
  };

  return (
    <div className="TodoListWrapper">
      <h2>Todo List</h2>
      <AddTodo addTodo={addTodo} />
      <div className="TodoList">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
