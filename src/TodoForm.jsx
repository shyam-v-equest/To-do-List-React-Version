import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TodoForm({ tasks, addTask, updateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); 

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find((task) => task.id === Number(id));
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
      }
    }
  }, [id, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); 

    try {
      if (!title || !description) { 
        throw new Error("Please enter both a title and description");
      }

      if (id) {
        updateTask({ id: Number(id), title, description });
      } else {
        addTask({ title, description });
      }
      navigate("/");
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <div>
      <h1>{id ? "Edit Task" : "Add Task"}</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <br />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <br />
        <button type="submit">{id ? "Update" : "Save"}</button>
        <button type="button" onClick={() => navigate("/")}>Go back</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}
    </div>
  );
}

export default TodoForm;
