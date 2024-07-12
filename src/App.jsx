import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')
  const [heading, setHeading] = useState("");


  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({ todos:newList }))
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex)=>{
      return todoIndex != index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(()=>{
    const today = new Date();

  // Adjust for starting week on Sunday
  // const dayOfWeek = today.getDay();
  const diff = (today.getDay() === 0) ? 0 : (7 - today.getDay()); // Adjust for Sunday as first day

  const startDate = new Date(today.setDate(today.getDate() - diff));
  const formattedStartDate = startDate.toLocaleDateString();

  const endDate = new Date(
    startDate.setDate(startDate.getDate() + 6)
  );
  const formattedEndDate = endDate.toLocaleDateString();

  // Update state with formatted heading
  setHeading(`Week of ${formattedStartDate} - ${formattedEndDate}`);
    
    if(!localStorage){
      return
    }
    
    let localTodos = localStorage.getItem('todos')
    if(!localTodos){
      return
    }
      
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
    
  },[])

  return (
    <>
      <h1>{heading}</h1> {/* Display the dynamic heading */}
      <TodoInput todoValue = {todoValue} setTodoValue = {setTodoValue} handleAddTodos = {handleAddTodos}/>
      <TodoList handleEditTodo = {handleEditTodo} handleDeleteTodo = {handleDeleteTodo} todos=
      {todos} />
    </>
  )
}

export default App
