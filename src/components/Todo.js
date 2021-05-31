import React from 'react';
import axios from 'axios';


const Todo = ({ todo, todos, setTodos }) => {
    const deleteHandler = () => {
        axios.delete('https://4ugzvhfkph.execute-api.eu-west-2.amazonaws.com/dev/todos/'+todo.id).then(
            (response) => {
                setTodos(todos.filter((el) => el.id !== todo.id));
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    };

    const doneHandler = () => {
        axios.put('https://4ugzvhfkph.execute-api.eu-west-2.amazonaws.com/dev/todos/' + todo.id, {done: !todo.done}).then(
            (response) => {
                setTodos(todos.map(item => {
                    if(item.id === todo.id) {
                        return {
                            ...item, done: !item.done
                        };
                    }
                    return item;
                }))
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }

    return(
        <div className="todo">
            <li className={`todo-item ${todo.done ? "completed" : ""}`}>
                {todo.task}
            </li>
            <button onClick={doneHandler} className="complete-btn">
                <i className="fas fa-check"></i>
            </button>
            <button onClick={deleteHandler} className="trash-btn">
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
};

export default Todo;