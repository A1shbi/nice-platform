import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./styles.css";

// Главный экран
const MainScreen = () => {
  return (
    <div className="main-screen">
      <h1>🚀 Күнделікті әдеттер трекері</h1>
      <Link to="/tracker">
        <button className="open-tracker">📋 Трекерге кіру</button>
      </Link>
    </div>
  );
};

// Экран трекера
const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [habitTime, setHabitTime] = useState("");

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(savedHabits);
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabit.trim() !== "" && habitTime.trim() !== "") {
      setHabits([
        ...habits,
        { text: newHabit, time: habitTime, completed: false, streak: 0 },
      ]);
      setNewHabit("");
      setHabitTime("");
    }
  };

  const toggleHabit = (index) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index
        ? {
            ...habit,
            completed: !habit.completed,
            streak: habit.completed ? habit.streak : habit.streak + 1,
          }
        : habit
    );
    setHabits(updatedHabits);
  };

  const removeHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  return (
    <div className="habit-tracker-container">
      <Link to="/" className="back-button">
        ⬅ Бас мәзірге оралу
      </Link>
      <h2 className="title">🚀 Әдеттер трекері</h2>
      <div className="input-container">
        <input
          type="text"
          className="habit-input"
          placeholder="🔥 Жаңа әдет қосу"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <input
          type="time"
          className="habit-time"
          value={habitTime}
          onChange={(e) => setHabitTime(e.target.value)}
        />
        <button className="add-button" onClick={addHabit}>
          ➕ Қосу
        </button>
      </div>
      <ul className="habit-list">
        {habits.map((habit, index) => (
          <li
            key={index}
            className={`habit-item ${habit.completed ? "completed" : ""}`}
          >
            <span className="habit-text" onClick={() => toggleHabit(index)}>
              {habit.text} ({habit.time}) {habit.completed ? "✅" : "❌"} (🔥
              {habit.streak})
            </span>
            <button
              className="remove-button"
              onClick={() => removeHabit(index)}
            >
              🗑 Өшіру
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Корневой компонент с маршрутизацией
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/tracker" element={<HabitTracker />} />
      </Routes>
    </Router>
  );
};

export default App;
