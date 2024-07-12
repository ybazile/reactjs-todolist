import React, { useState } from 'react';
import TodoCard from './TodoCard';

export default function TodoList(props) {
    const { todos, handleEditTodo, handleDeleteTodo } = props;
    const [completedTodos, setCompletedTodos] = useState([]);

    const toggleComplete = (index) => {
        const updatedCompletedTodos = [...completedTodos];
        if (updatedCompletedTodos.includes(index)) {
            updatedCompletedTodos.splice(updatedCompletedTodos.indexOf(index), 1);
        } else {
            updatedCompletedTodos.push(index);
        }
        setCompletedTodos(updatedCompletedTodos);
    };

    return (
        <ul className='main'>
            {todos.map((todo, todoIndex) => (
                <TodoCard
                    {...props}
                    key={todoIndex}
                    index={todoIndex}
                    isComplete={completedTodos.includes(todoIndex)}
                    toggleComplete={toggleComplete}
                >
                    <p>{todo}</p>
                </TodoCard>
            ))}
        </ul>
    );
}
