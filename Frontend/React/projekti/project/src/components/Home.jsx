// React-kirjaston komponenttien tuonti
import React, { useState, useEffect, useCallback } from "react";
import "./Home.css";

// Komponentin päämäärittely
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskTags, setNewTaskTags] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [active, setActive] = useState(false);
  const [editedTasks, setEditedTasks] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Käyttöön otettu useEffect-koukku
  useEffect(() => {
    fetchTasks();
  }, [filterTags]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3010/tasks");
      const data = await response.json();
      const tasksWithActive = data.map((task) => ({
        ...task,
        active: task.active || false,
      }));

      // Poistaa tyhjät tagit
      const nonEmptyFilterTags = filterTags.filter((tag) => tag.trim() !== "");

      // Suodattaa tehtävät tagien perusteella
      const filteredTasks =
        nonEmptyFilterTags.length === 0
          ? tasksWithActive
          : tasksWithActive.filter((task) =>
              nonEmptyFilterTags.some((filterTag) =>
                task.tags.some((tag) =>
                  tag.toLowerCase().includes(filterTag.toLowerCase())
                )
              )
            );

      setTasks(tasksWithActive);
      setFilteredTasks(filteredTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [filterTags]);

  // Uuden tehtävän lisääminen
  const addTask = async () => {
    if (newTask && newTaskTime && newTaskDate) {
      const newTaskObject = {
        name: newTask,
        time: newTaskTime,
        date: newTaskDate,
        tags: newTaskTags.split(",").map((tag) => tag.trim()),
      };

      try {
        const response = await fetch("http://localhost:3010/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTaskObject),
        });

        if (response.ok) {
          setNewTask("");
          setNewTaskTime("");
          setNewTaskDate("");
          setNewTaskTags("");
          setErrorMessage("");
          fetchTasks();
        } else {
          setErrorMessage("Tallennus epäonnistui");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    } else {
      setErrorMessage("Täytä kaikki kentät.");
    }
  };

  // Tehtävän/tehtävien poistaminen
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3010/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTasks();
        setFilteredTasks(filteredTasks.filter((task) => task.id !== taskId));
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Tehtävän muokkaamiseen liittyvät toiminnallisuudet
  const startEditing = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskToEdit);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const updateTask = async (taskId) => {
    try {
      const taskToUpdate =
        editingTask || tasks.find((task) => task.id === taskId);

      const response = await fetch(
        `http://localhost:3010/tasks/${taskToUpdate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newTask || taskToUpdate.name,
            time: newTaskTime || taskToUpdate.time,
            date: newTaskDate || taskToUpdate.date,
            tags: newTaskTags
              ? newTaskTags.split(",").map((tag) => tag.trim())
              : taskToUpdate.tags,
            active: active, // Varmistaa, että active-arvo säilyy ennallaan
          }),
        }
      );

      if (response.ok) {
        await fetchTasks();
        setEditingTask(null);
      } else {
        console.error("Error updating task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Käyttöliittymän muokkaamiseen liittyvät toiminnot
  const handleInputChange = (e, key) => {
    if (editingTask) {
      setEditingTask({
        ...editingTask,
        [key]: e.target.value,
      });
    } else {
      // Päivittää uuden tehtävän tila
      switch (key) {
        case "name":
          setNewTask(e.target.value);
          break;
        case "time":
          setNewTaskTime(e.target.value);
          break;
        case "date":
          setNewTaskDate(e.target.value);
          break;
        case "tags":
          // Muuttaa syötteen tagit taulukoksi
          setNewTaskTags(e.target.value.split(",").map((tag) => tag.trim()));
          break;
        default:
          break;
      }
    }
  };

  const saveTaskChanges = async (taskId) => {
    const editedTask = tasks.find((task) => task.id === taskId);

    try {
      const response = await fetch(`http://localhost:3010/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editedTask.name,
          time: editedTask.time,
          date: editedTask.date,
          tags: editedTask.tags,
          active: editedTask.active,
        }),
      });

      if (response.ok) {
        // Päivittää tilan ja poistaa tehtävän editedTasks-taulukosta
        setEditedTasks(editedTasks.filter((id) => id !== taskId));
        fetchTasks(); // Päivittää näytettävät tehtävät
      } else {
        console.error("Error updating task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Renderöinti
  return (
    <div>
      <h2>Tehtäväkirjanpito</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="input-container">
        <label>Tehtävä:</label>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Aika:</label>
        <input
          type="text"
          value={newTaskTime}
          onChange={(e) => setNewTaskTime(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Päivämäärä:</label>
        <input
          type="date"
          value={newTaskDate}
          onChange={(e) => setNewTaskDate(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Tagit (pilkuilla eroteltuna):</label>
        <input
          type="text"
          value={newTaskTags}
          onChange={(e) => setNewTaskTags(e.target.value)}
        />
      </div>

      <div className="button-container">
        <button onClick={() => (editingTask ? updateTask() : addTask())}>
          {editingTask ? "Tallenna muutokset" : "Lisää tehtävä"}
        </button>
      </div>

      <h2>Suodata tagit</h2>

      <div className="input-container">
        <label>Suodata tagien perusteella:</label>
        <input
          type="text"
          value={filterTags.join(",")}
          onChange={(e) =>
            setFilterTags(e.target.value.split(",").map((tag) => tag.trim()))
          }
        />
      </div>

      <div className="button-container">
        <button onClick={() => setFilterTags([])}>Näytä kaikki</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className={`task-box ${task.active ? "active" : "inactive"}`}
          >
            <div>
              <strong>Tehtävä:</strong> {task.name}
            </div>
            <div>
              <strong>Aika:</strong> {task.time}
            </div>
            <div>
              <strong>Päivämäärä:</strong> {task.date}
            </div>
            <div>
              <strong>Tagit:</strong> {task.tags.join(", ")}
            </div>
            <div>
              <button onClick={() => startEditing(task.id)}>Muokkaa</button>
              <button onClick={() => deleteTask(task.id)}>Poista</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
