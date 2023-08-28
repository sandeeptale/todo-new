






















import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase'; // Make sure to import your firebase configuration




import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";



function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [user, setUser] = useState(null); // Include user state for authentication
  const [reminders, setReminders] = useState([]);
  const [reminderDates, setReminderDates] = useState([]);



  useEffect(() => {
    // Load tasks and reminders from local storage when the component mounts
    const storedData = JSON.parse(localStorage.getItem('tasksData'));
    if (storedData) {
      setTasks(storedData.tasks);
      setReminders(storedData.reminders);
    }
  }, []);

  const handleSetReminder = (index, reminderDate) => {
    const updatedReminderDates = [...reminderDates];
    updatedReminderDates[index] = reminderDate;
    setReminderDates(updatedReminderDates);
  };


  useEffect(() => {
    // Save tasks and reminders to local storage whenever they change
    saveTasksToLocalStorage(tasks, reminders);
  }, [tasks, reminders]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser); // Set the authenticated user
      } else {
        setUser(null); // No user is authenticated
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


 
  const addTask = () => {
    if (taskText) {
      const today = new Date();
      const defaultValue = today.toISOString().split('T')[0];
  
      const newTask = { text: taskText, completed: false, dueDate: null };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
  
      const newReminders = [...reminders, defaultValue];
      setReminders(newReminders);
  
      const newReminderDates = [...reminderDates, defaultValue];
      setReminderDates(newReminderDates);
  
      saveTasksToLocalStorage(updatedTasks, newReminders, newReminderDates); // Update the function call
  
      setTaskText('');
    }
  };
  
  const saveTasksToLocalStorage = (tasks, reminders, reminderDates) => { // Update the function parameters
    const data = { tasks, reminders, reminderDates }; // Include reminderDates in the data object
    localStorage.setItem('tasksData', JSON.stringify(data));
  };
  





  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter(task => !task.completed);
    setTasks(updatedTasks);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('index'));
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(sourceIndex, 1);
    updatedTasks.splice(targetIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  const handleSetDueDate = (index, dueDate) => {
    const today = new Date();
    const selectedDate = new Date(dueDate);

    if (selectedDate >= today) {
      const updatedTasks = [...tasks];
      updatedTasks[index].dueDate = dueDate;
      setTasks(updatedTasks);
    } else {
      // Handle the case where the user selected a date before today
      alert("Please select a valid date.");
    }
  };


  const toggleCompletedTasks = () => {
    setShowCompleted(!showCompleted);
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchText.toLowerCase()) &&
    (showCompleted ? true : !task.completed)
  );












  return (



    <div className="App">


      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/todo"
            element={user ? (
              <>
                <Home name={user.displayName} />
                <h1 className="app-title"> To-Do App</h1>
                <div className="input-section">
                  <input
                    type="text"
                    className="add-task-input"
                    placeholder="Add a new task..."
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                  />
                  <button className="add-button" onClick={addTask}>Add Task</button>
                </div>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search tasks..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button className="toggle-button" onClick={toggleCompletedTasks}>
                  {showCompleted ? 'Hide Completed' : 'Show Completed'}
                </button>
                <ul className="task-list">
                  {filteredTasks.map((task, index) => (
                    <li
                      key={index}
                      className={`task-item ${task.completed ? 'completed' : ''}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <div className="task-checkbox">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(index)}
                        />
                      </div>


                      {/* <input
              type="date"
              className="due-date-input"
              value={task.dueDate || ''}
              onChange={(e) => handleSetDueDate(index, e.target.value)}
            /> */}
                      {/* Include a new input field for reminders */}
                      <input
                        type="date"
                        className="reminder-input"
                        value={reminderDates[index]}
                        
                        disabled
                        onChange={(e) => handleSetReminder(index, e.target.value)}
                      />










                      <input
                        type="text"
                        className="task-text"
                        value={task.text}
                        onChange={(e) => editTask(index, e.target.value)}
                      />

                      <input
                        type="date"
                        className="due-date-input"
                        value={task.dueDate || ''}
                        onChange={(e) => handleSetDueDate(index, e.target.value)}
                      />

                      <button className="edit-button" onClick={() => editTask(index, prompt('Edit task:', task.text))}>
                        Edit
                      </button>
                      <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                  ))}
                </ul>
                <button className="clear-button" onClick={clearCompletedTasks}>Clear Completed</button>
              </>
            ) : (
              <Login />
            )}
          />
        </Routes>
      </Router>


    </div>
  );
}

export default App;


