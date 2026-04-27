import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Activity, Apple, Calendar, Utensils, Sparkles } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import NutritionCalculator from './pages/NutritionCalculator';
import DietPlanner from './pages/DietPlanner';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', paddingLeft: '0.5rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)', padding: '0.5rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(58, 123, 213, 0.4)' }}>
              <Apple color="white" size={28} />
            </div>
            <span style={{ fontSize: '1.15rem', lineHeight: '1.2', fontWeight: 800, background: 'linear-gradient(to right, #3a7bd5, #00d2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Eat Right<br/>To Live Healthy
            </span>
          </div>
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} end>
              <Activity size={22} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/recommendations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <Utensils size={22} />
              <span>Recommendations</span>
            </NavLink>
            <NavLink to="/calculator" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <Apple size={22} />
              <span>Nutrition</span>
            </NavLink>
            <NavLink to="/planner" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <Calendar size={22} />
              <span>Planner</span>
            </NavLink>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/calculator" element={<NutritionCalculator />} />
            <Route path="/planner" element={<DietPlanner />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
