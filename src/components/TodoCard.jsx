import React from "react";

export default function TodoCard(props) {
  const { children, handleDeleteTodo, index, handleCompleteTodo, handleIncompleteTodo, handleEditTodo, isComplete, isIncomplete } = props;

  return (
    <li
      className={`todoItem ${isComplete ? 'complete' : ''} ${isIncomplete ? 'incomplete' : ''}`}
      onClick={() => handleCompleteTodo(index)}
      onDoubleClick={() => handleIncompleteTodo(index)}
    >
      {children}
      <div className="actionsContainer">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering the li's onClick
            handleEditTodo(index);
          }}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering the li's onClick
            handleDeleteTodo(index);
          }}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </li>
  );
}
