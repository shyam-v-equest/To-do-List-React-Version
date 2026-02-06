import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
export default function To_Do_Form({ tasks, addTask, updateTask }){
    const navigate = useNavigate();
    const {id} = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        if (id) {
            const taskToEdit = tasks.find(task => task.id === Number(id));
            if (taskToEdit) {
                setValue("title", taskToEdit.title);
                setValue("description", taskToEdit.description);
                setValue("username", taskToEdit.username);
                setValue("password", taskToEdit.password);
                setValue("email", taskToEdit.email);
                setValue("telephone", taskToEdit.telephone);
                setValue("url" ,taskToEdit.url);
                setValue("date", taskToEdit.date);
            }
        }
    }, [id, tasks, setValue]);


    const onSubmit = (data) => {
        if (id) {
            updateTask(Number(id), data);
        } else {
        addTask(data);
        }
        navigate("/");
    }

    return(
        <div>
        <h1 className="page-title">{id ? "Edit Task" : "Add Task"}</h1>
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("title")} placeholder="Title" autoFocus/>{errors.title && <p className="error">{errors.title.message}</p>}
                <textarea type="text" {...register("description")} placeholder="Description"/>{errors.description && <p className="error">{errors.description.message}</p>}
                <input type="text" {...register("username")} placeholder="Username"/>{errors.username && <p className="error">{errors.username.message}</p>}
                <input type="password" {...register("password")} placeholder="Password"/>{errors.password && <p className="error">{errors.password.message}</p>}
                <input type="email" {...register("email")} placeholder="your@email.com"/>{errors.email && <p className="error">{errors.email.message}</p>}
                <input type="tel" {...register("telephone")} placeholder="Phone Number"/>{errors.telephone && <p className="error">{errors.telephone.message}</p>}
                <input type="url" {...register("url")} placeholder="https://wwww.example.com" />{errors.url && <p className="error">{errors.url.message}</p>}
                <input type="date" {...register("date")} placeholder="Date"/>{errors.date && <p className="error">{errors.date.message}</p>}
                <button className="btn" type="submit"> {id ? "Update" : "Save"} </button>
                <button className="btn" type="button" onClick={() => navigate("/")}> Go Back </button>
            </form>
        </div>
        </div>
    );
}