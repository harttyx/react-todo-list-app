import React from 'react'
import axios from 'axios'

const Form = ({ setInputText, inputText, todos, setTodos }) => {

    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };

    const submitTodoHandler = (e) => {
        e.preventDefault();
        if (inputText) {
            axios.post('https://4ugzvhfkph.execute-api.eu-west-2.amazonaws.com/dev/todos', {task: inputText}
            ).then((response)=> {
                axios.get('https://4ugzvhfkph.execute-api.eu-west-2.amazonaws.com/dev/todos').then(
                    (res) => {
                        let data = res.data;
                        setTodos(data.sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            }).catch((error) => {
                console.log(error);
            });
        }
        setTodos([...todos]);
        setInputText("");
    }

    return(
        <form>
            <input value={inputText} onChange = {inputTextHandler} type="text" className="todo-input" />
            <button onClick = {submitTodoHandler} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
        </form>
    );
};

export default Form;