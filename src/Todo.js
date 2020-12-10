import React, {useState} from 'react';
import './Todo.css';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { List, ListItemAvatar, ListItem, ListItemText, Button, Modal} from "@material-ui/core";
import db from "./firebase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const updateTodo = () => {
      //update the todo with the input text
      db.collection("todos").doc(props.todo.id).set({
        todo: input
      }, { merge: true });
    
    setOpen(false);
  }
    
  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>open</h1>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={updateTodo}>Update Todo 🔄</Button>
        </div>
      </Modal>
        <List
          style={{
            color: "white",
            backgroundColor: "blue",
            height: "65px",
            borderRadius: "10px", 
            minWidth: "430px",
            maxWidth: "50vw",
            padding: "0px",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          <ListItem>
            <ListItemAvatar></ListItemAvatar>
            <ListItemText primary={props.todo.todo} secondary="Deadline ⏰" />
          </ListItem>
          <Button className="edit" onClick={(e) => setOpen(true)}>
            Edit 📑
          </Button>
          <DeleteForeverIcon className="delete" color="secondary" variant="contained"
            onClick={event =>
              db.collection("todos").doc(props.todo.id).delete()} />
      </List>
    </>
  );
};

export default Todo
