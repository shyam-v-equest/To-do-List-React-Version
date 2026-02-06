import { useNavigate } from "react-router-dom";

export default function TaskList({ tasks, deleteTask }) {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="page-title">All Tasks</h1>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button className="btn" onClick={() => navigate("/add")}>Add Task</button>
      </div>
      {tasks.length === 0 && <h2>No task is added to display</h2>}  
      <div className="container">
        {tasks.map((task) => (
          <div key={task.id} className="card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button className="btn" onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
            <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}