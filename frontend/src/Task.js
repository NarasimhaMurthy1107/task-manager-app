import { useState, useEffect } from "react";
import axios from "axios";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // FETCH TASKS
  const getTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {
    await axios.post("http://localhost:5000/api/tasks", { title });
    setTitle("");
    getTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    getTasks();
  };

  return (
    <div>
      <h2>Task Manager</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Task;