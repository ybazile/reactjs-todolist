import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [heading, setHeading] = useState("");
  const [completeTodos, setCompleteTodos] = useState([]);
  const [incompleteTodos, setIncompleteTodos] = useState([]);

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    persistData(newTodoList);
    setTodos(newTodoList);
    setCompleteTodos(completeTodos.filter(i => i !== index));
    setIncompleteTodos(incompleteTodos.filter(i => i !== index));
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }

  function handleCompleteTodo(index) {
    if (completeTodos.includes(index)) {
      setCompleteTodos(completeTodos.filter(i => i !== index));
    } else {
      setCompleteTodos([...completeTodos, index]);
      setIncompleteTodos(incompleteTodos.filter(i => i !== index));
    }
  }

  function handleIncompleteTodo(index) {
    if (incompleteTodos.includes(index)) {
      setIncompleteTodos(incompleteTodos.filter(i => i !== index));
    } else {
      setIncompleteTodos([...incompleteTodos, index]);
      setCompleteTodos(completeTodos.filter(i => i !== index));
    }
  }

  useEffect(() => {
    const today = new Date();
    const diff = today.getDay() === 0 ? 0 : 7 - today.getDay();
    const startDate = new Date(today.setDate(today.getDate() - diff));
    const formattedStartDate = startDate.toLocaleDateString();
    const endDate = new Date(startDate.setDate(startDate.getDate() + 6));
    const formattedEndDate = endDate.toLocaleDateString();
    setHeading(`Week of ${formattedStartDate} - ${formattedEndDate}`);

    if (!localStorage) {
      return;
    }

    let localTodos = localStorage.getItem("todos");
    if (!localTodos) {
      return;
    }

    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, []);

  return (
    <>
      <h1>{heading}</h1>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        handleCompleteTodo={handleCompleteTodo}
        handleIncompleteTodo={handleIncompleteTodo}
        todos={todos}
        completeTodos={completeTodos}
        incompleteTodos={incompleteTodos}
      />
    </>
  );
}

export default App;
