import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("https://task-manager-app-22re.onrender.com/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;

    await axios.post("https://task-manager-app-22re.onrender.com/api/tasks", {
      title
    });

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://task-manager-app-22re.onrender.com/api/tasks/${id}`);
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await axios.put(`https://task-manager-app-22re.onrender.com/api/tasks/${id}`);
    fetchTasks();
  };
return (
  <div className="container">
    <h1 className="title">✨ Task Manager</h1>
    <p className="subtitle">Organize your day efficiently</p>

    <div className="card">
      <div className="input-group">
        <input
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">No tasks yet 😴</p>
      ) : (
        <ul className="task-list">
          {tasks.map((t) => (
            <li key={t._id} className="task-item">
              <span
                onClick={() => toggleTask(t._id)}
                className={t.completed ? "completed" : ""}
              >
                ✔ {t.title}
              </span>

              <button
                className="delete-btn"
                onClick={() => deleteTask(t._id)}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
}

export default Dashboard;