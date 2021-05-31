import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {

  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('https://4ugzvhfkph.execute-api.eu-west-2.amazonaws.com/dev/todos').then(
        (response) => {
          console.log(response)
            setTodos(response.data.sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
        },
        (error) => {
          console.log(error)
        }
    )
  }, [])

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText= {setInputText} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
