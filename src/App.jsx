import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TaskList from "./TaskList";
import TodoForm from "./TodoForm";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const newTask = { id: Date.now(), ...task };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) =>task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <TaskList tasks={tasks} deleteTask={deleteTask}/>}/>
        <Route path="/add" element={<TodoForm tasks={tasks} addTask={addTask} updateTask={updateTask}/>}/>
        <Route path="/edit/:id" element={<TodoForm tasks={tasks} addTask={addTask} updateTask={updateTask}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;