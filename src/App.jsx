import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TaskList from "./TaskList";
import To_Do_Form from "./To_Do_Form";
import "./App.css";
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
          <Route path="/add" element={<To_Do_Form tasks={tasks} addTask={addTask} updateTask={updateTask}/>}/>
          <Route path="/edit/:id" element={<To_Do_Form tasks={tasks} addTask={addTask} updateTask={updateTask}/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;