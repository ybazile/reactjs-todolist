import React from "react";
import TodoCard from "./TodoCard";

export default function TodoList(props) {
  const { todos, completeTodos, incompleteTodos } = props;
  return (
    <ul className="main">
      {todos.map((todo, todoIndex) => {
        return (
          <TodoCard
            {...props}
            key={todoIndex}
            index={todoIndex}
            isComplete={completeTodos.includes(todoIndex)}
            isIncomplete={incompleteTodos.includes(todoIndex)}
          >
            <p>{todo}</p>
          </TodoCard>
        );
      })}
    </ul>
  );
}
