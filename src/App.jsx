import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [heading, setHeading] = useState("");
  const [completeTodos, setCompleteTodos] = useState([]);
  const [incompleteTodos, setIncompleteTodos] = useState([]);

  // Function to persist todos and completion state to localStorage
  function persistData(newTodos, newCompleteTodos, newIncompleteTodos) {
    localStorage.setItem("todos", JSON.stringify({ todos: newTodos }));
    localStorage.setItem("completeTodos", JSON.stringify(newCompleteTodos));
    localStorage.setItem("incompleteTodos", JSON.stringify(newIncompleteTodos));
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    const newComplete = [...completeTodos];
    const newIncomplete = [...incompleteTodos];
    persistData(newTodoList, newComplete, newIncomplete);
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    const newComplete = completeTodos.filter(i => i !== index);
    const newIncomplete = incompleteTodos.filter(i => i !== index);
    persistData(newTodoList, newComplete, newIncomplete);
    setTodos(newTodoList);
    setCompleteTodos(newComplete);
    setIncompleteTodos(newIncomplete);
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }

  function handleCompleteTodo(index) {
    if (completeTodos.includes(index)) {
      const newComplete = completeTodos.filter(i => i !== index);
      persistData(todos, newComplete, incompleteTodos);
      setCompleteTodos(newComplete);
    } else {
      const newComplete = [...completeTodos, index];
      const newIncomplete = incompleteTodos.filter(i => i !== index);
      persistData(todos, newComplete, newIncomplete);
      setCompleteTodos(newComplete);
      setIncompleteTodos(newIncomplete);
    }
  }

  function handleIncompleteTodo(index) {
    if (incompleteTodos.includes(index)) {
      const newIncomplete = incompleteTodos.filter(i => i !== index);
      persistData(todos, completeTodos, newIncomplete);
      setIncompleteTodos(newIncomplete);
    } else {
      const newIncomplete = [...incompleteTodos, index];
      const newComplete = completeTodos.filter(i => i !== index);
      persistData(todos, newComplete, newIncomplete);
      setCompleteTodos(newComplete);
      setIncompleteTodos(newIncomplete);
    }
  }

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Get the current day of the week (0-6)
    const diffToSunday = dayOfWeek; // Number of days from today to the last Sunday

    // Calculate the start date (Sunday) of the current week
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - diffToSunday);
    const formattedStartDate = startDate.toLocaleDateString();

    // Calculate the end date (Saturday) of the current week
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    const formattedEndDate = endDate.toLocaleDateString();

    setHeading(`Week of ${formattedStartDate} - ${formattedEndDate}`);

    // Retrieve todos and completion state from localStorage
    if (!localStorage) {
      return;
    }

    let localTodos = localStorage.getItem("todos");
    if (!localTodos) {
      return;
    }

    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);

    let localCompleteTodos = localStorage.getItem("completeTodos");
    if (localCompleteTodos) {
      localCompleteTodos = JSON.parse(localCompleteTodos);
      setCompleteTodos(localCompleteTodos);
    }

    let localIncompleteTodos = localStorage.getItem("incompleteTodos");
    if (localIncompleteTodos) {
      localIncompleteTodos = JSON.parse(localIncompleteTodos);
      setIncompleteTodos(localIncompleteTodos);
    }
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
