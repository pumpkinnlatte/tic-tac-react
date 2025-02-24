// src/App.jsx
import React from 'react';
import TicTacToe from './pages/TicTacToe';
import ToDoList from './pages/ToDoList';

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <Router>
        <nav>
          <ul>
            <li><Link to="/">Tic-Tac-Toe</Link></li>
            <li><Link to="/to-do-list">ToDoList</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<TicTacToe />} />
          <Route path="/to-do-list" element={<ToDoList />} />
        </Routes>
      </Router>
  );
}



export default App;
