import { useNavigate } from "react-router-dom";

function TaskList({ tasks, deleteTask }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>All Tasks</h1>
      <button onClick={() => navigate("/add")}>Add Task</button>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;