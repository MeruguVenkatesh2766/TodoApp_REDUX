import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "./actionTypes"; // Add EDIT_TODO action type

let nextTodoId = 0;

export const addTodo = ({ task, status }) => ({ // Add status to addTodo action
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    task,
    status // Include status in payload
  }
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  payload: {
    id
  }
});

export const editTodo = ({ id, status }) => ({ // Add editTodo action creator
  type: EDIT_TODO,
  payload: {
    id,
    status
  }
});
