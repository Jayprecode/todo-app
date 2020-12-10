import React, { useState,useEffect, forwardRef } from 'react';
import Todo from "./Todo"
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";



function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //When the app loads, we need to listen to the database and fetch new todos as the get added or removed
  useEffect(() => {
    //this code here... fires when the app.js loads
    db.collection("todos").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id , todo: doc.data().todo })))
    })
  }, []);

  const addTodo = (event) => {
    //This will fire off when we click the button
    event.preventDefault(); //Will stop the refresh
    
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    
    setTodos([...todos, input]);
    setInput(''); //Clears up after hitting he submit button
  }
  return (
    <div className="App">
      <h1>Todo-List 📑</h1>

      <form>
        <FormControl>
          <InputLabel>Write a Todo ✍️</InputLabel>
          <Input
            style={{
              color: "white",
            }}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          className="button"
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo 📌
        </Button>
      </form>

      <ul style={{
        width: "40vw",
      }}>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
