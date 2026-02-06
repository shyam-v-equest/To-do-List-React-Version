import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TodoForm({ tasks, addTask, updateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    description: ""
  }); 

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
    let newErrors = { title: "", description: "" };
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    if (!newErrors.title && !newErrors.description) {
      if (id) {
        updateTask(Number(id), { title, description });
      } else {
        addTask({ title, description });
      }
      navigate("/");
    }
  };

  return (
  <div>
    <h1 className="page-title">{id ? "Edit Task" : "Add Task"}</h1>
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div><input type="text" placeholder="Title" value={title} onChange={(e) => {setTitle(e.target.value); setErrors({...errors,title: ""});}} autoFocus/>{errors.title && <p className="error">Error: {errors.title}</p>}</div>
        <div><textarea placeholder="Description" value={description} onChange={(e) => {setDescription(e.target.value); setErrors({...errors,description: ""});}} />{errors.description && <p className="error">Error: {errors.description}</p>}</div>
        <button className="btn" type="submit"> {id ? "Update" : "Save"} </button>
        <button className="btn" type="button" onClick={() => navigate("/")}> Go Back </button>
      </form>
    </div>
  </div>
);
}

export default TodoForm;
