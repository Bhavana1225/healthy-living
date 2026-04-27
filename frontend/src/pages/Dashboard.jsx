import React, { useState, useEffect } from 'react';
import { Activity, Droplet, Flame, Moon, BellRing, BrainCircuit, TrendingUp, AlertCircle, CheckCircle, Plus, X, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Form input state
  const [consumedFoods, setConsumedFoods] = useState([]);
  const [manualFoodInput, setManualFoodInput] = useState('');
  
  const [inputs, setInputs] = useState({
    water: '',
    sleepHours: '',
    stress: 'Medium',
    timeOfDay: 'Morning'
  });

  // Submitted dashboard data
  const [dashboardData, setDashboardData] = useState(null);
  const [nudge, setNudge] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Derived Total Calories
  const totalCalories = consumedFoods.reduce((sum, food) => sum + food.calories, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  // Mock AI Calorie Estimator
  const estimateCalories = (foodString) => {
    const lower = foodString.toLowerCase();
    if (lower.includes('pizza')) return 285;
    if (lower.includes('burger')) return 550;
    if (lower.includes('salad')) return 200;
    if (lower.includes('chicken')) return 350;
    if (lower.includes('rice')) return 200;
    if (lower.includes('apple')) return 95;
    if (lower.includes('banana')) return 105;
    if (lower.includes('egg')) return 80;
    if (lower.includes('coffee')) return 5;
    if (lower.includes('steak')) return 600;
    if (lower.includes('pasta')) return 450;
    if (lower.includes('oat')) return 150;
    if (lower.includes('bread') || lower.includes('toast')) return 120;
    // Fallback estimate for unknown foods
    return Math.floor(Math.random() * 300) + 150; 
  };

  const addFood = () => {
    if (!manualFoodInput.trim()) return;
    
    const estimatedCals = estimateCalories(manualFoodInput);
    setConsumedFoods([...consumedFoods, { 
      name: manualFoodInput, 
      calories: estimatedCals, 
      uniqueId: Date.now() 
    }]);
    
    setManualFoodInput(''); // clear input
    setErrorMsg('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFood();
    }
  };

  const removeFood = (uniqueId) => {
    setConsumedFoods(consumedFoods.filter(f => f.uniqueId !== uniqueId));
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    
    // Validation
    if (!inputs.water || !inputs.sleepHours) {
      setErrorMsg("Please fill out your water and sleep hours.");
      return;
    }
    if (consumedFoods.length === 0) {
      setErrorMsg("Please add at least one food item before analyzing.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg('');
    
    setTimeout(() => {
      const waterGlass = parseInt(inputs.water);
      const sleepHr = parseFloat(inputs.sleepHours);
      const calculatedSleepScore = Math.min(100, Math.round((sleepHr / 8) * 100));
      
      setDashboardData({
        calories: totalCalories,
        water: waterGlass,
        sleepScore: calculatedSleepScore,
        stressLevel: inputs.stress,
        timeOfDay: inputs.timeOfDay
      });

      // AI Logic
      if (totalCalories > 2000) {
        setNudge({
          title: 'Calorie Goal Exceeded',
          message: `You ate ${totalCalories} kcal today, which is ${totalCalories - 2000} over your target. Try a 20-minute walk tonight to balance it out.`,
          type: 'warning',
          action: 'View Exercises'
        });
      } else if (calculatedSleepScore < 60) {
        if (inputs.timeOfDay === 'Morning') {
          setNudge({
            title: 'Poor Recovery Detected',
            message: `You only slept ${sleepHr} hours. Skip heavy workouts today and opt for light stretching.`,
            type: 'warning',
            action: 'View Stretches'
          });
        } else {
          setNudge({
            title: 'Predicted Energy Crash',
            message: `Due to poor sleep, you might crash soon. Grab a high-protein snack to stabilize your blood sugar.`,
            type: 'warning',
            action: 'View Snacks'
          });
        }
      } else if (inputs.stress === 'High') {
        if (inputs.timeOfDay === 'Evening') {
          setNudge({
            title: 'High Cortisol Warning',
            message: 'You reported high stress. A magnesium-rich dinner helps your body relax before bed.',
            type: 'info',
            action: 'Calming Recipes'
          });
        } else {
          setNudge({
            title: 'Elevated Stress',
            message: 'Take 5 minutes to do deep breathing exercises to lower your heart rate right now.',
            type: 'info',
            action: 'Start Breathing'
          });
        }
      } else if (waterGlass < 4 && inputs.timeOfDay !== 'Morning') {
        setNudge({
          title: 'Dehydration Risk',
          message: `You've only had ${waterGlass} glasses of water. Drink a full glass right now to prevent fatigue.`,
          type: 'info',
          action: 'Log Water'
        });
      } else {
        setNudge({
          title: 'Optimal Routine',
          message: 'All systems go! Your sleep, diet, and hydration are perfectly aligned with your goals.',
          type: 'success',
          action: 'Dismiss'
        });
      }
      
      setIsAnalyzing(false);
    }, 1000);
  };

  const baseChartData = [
    { name: 'Mon', calories: 1800, target: 2000 },
    { name: 'Tue', calories: 1950, target: 2000 },
    { name: 'Wed', calories: 2100, target: 2000 },
    { name: 'Thu', calories: 1750, target: 2000 },
    { name: 'Fri', calories: 1900, target: 2000 },
  ];

  const chartData = dashboardData 
    ? [...baseChartData, { name: 'Today', calories: dashboardData.calories, target: 2000 }]
    : baseChartData;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>Daily Health Check-In</h1>
          <p style={{ color: 'var(--text-light)', marginTop: '0.25rem' }}>Log what you ate and how you feel. The AI will do the math.</p>
        </div>
      </div>

      <div className={dashboardData ? "grid-2" : ""} style={{ gap: '2rem', marginBottom: '2rem' }}>
        
        {/* Input Form */}
        <div className="card" style={{ borderTop: '4px solid var(--primary)', maxWidth: dashboardData ? '100%' : '700px', margin: dashboardData ? '0' : '0 auto' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)' }}>
            <Activity size={20} color="var(--primary)" /> Log Your Data
          </h3>
          
          {errorMsg && (
            <div style={{ background: 'rgba(231, 76, 60, 0.1)', color: 'var(--error)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Manual AI Food Logger */}
            <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontWeight: 600, fontSize: '0.875rem' }}>
                <span>Type what you ate today:</span>
                <span style={{ color: totalCalories > 2000 ? 'var(--warning)' : 'var(--primary)' }}>
                  Est. Total: {totalCalories} kcal
                </span>
              </label>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={16} color="var(--text-light)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    value={manualFoodInput} 
                    onChange={(e) => setManualFoodInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. Cheeseburger and fries"
                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white' }}
                  />
                </div>
                <button type="button" onClick={addFood} className="btn" style={{ padding: '0 1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Plus size={18} /> Add
                </button>
              </div>

              {/* Added Foods List */}
              {consumedFoods.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {consumedFoods.map(food => (
                    <div key={food.uniqueId} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.25rem 0.5rem 0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', border: '1px solid var(--primary)', color: 'var(--primary)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <span style={{ fontWeight: 500 }}>{food.name} <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', fontWeight: 'normal' }}>({food.calories} kcal)</span></span>
                      <button type="button" onClick={() => removeFood(food.uniqueId)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)', display: 'flex', alignItems: 'center' }}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', fontStyle: 'italic' }}>
                  Type a food above and press Enter. The AI will estimate the calories.
                </div>
              )}
            </div>

            <div className="grid-2">
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Water (Glasses)</label>
                <input 
                  type="number" name="water" value={inputs.water} onChange={handleInputChange} placeholder="e.g., 5" min="0"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Hours of Sleep</label>
                <input 
                  type="number" step="0.5" name="sleepHours" value={inputs.sleepHours} onChange={handleInputChange} placeholder="e.g., 7.5" min="0" max="24"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            <div className="grid-2">
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Time of Day Logged</label>
                <select 
                  name="timeOfDay" value={inputs.timeOfDay} onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white' }}
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Stress Level</label>
                <select 
                  name="stress" value={inputs.stress} onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'white' }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={isAnalyzing} className="btn" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem' }}>
              {isAnalyzing ? <><Activity className="spin" size={18} /> Analyzing Data...</> : <><BrainCircuit size={18} /> Analyze My Day</>}
            </button>
          </form>
        </div>

        {/* Dynamic Results Dashboard */}
        {dashboardData && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            
            {/* AI Nudge */}
            {nudge && (
              <div style={{
                padding: '1.5rem', borderRadius: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center',
                background: nudge.type === 'warning' ? 'linear-gradient(135deg, rgba(241, 196, 15, 0.1), rgba(241, 196, 15, 0.05))' : 
                            nudge.type === 'info' ? 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(52, 152, 219, 0.05))' : 
                            'linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(46, 204, 113, 0.05))',
                border: `1px solid ${nudge.type === 'warning' ? 'var(--warning)' : nudge.type === 'info' ? '#3498DB' : 'var(--primary)'}`
              }}>
                <div style={{ 
                  background: nudge.type === 'warning' ? 'var(--warning)' : nudge.type === 'info' ? '#3498DB' : 'var(--primary)',
                  padding: '1rem', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {nudge.type === 'success' ? <CheckCircle size={24} /> : nudge.type === 'warning' ? <AlertCircle size={24} /> : <BellRing size={24} />}
                </div>
                <div>
                  <h3 style={{ marginBottom: '0.25rem', color: 'var(--text)', fontSize: '1.1rem' }}>{nudge.title}</h3>
                  <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>{nudge.message}</p>
                </div>
              </div>
            )}

            {/* Metrics */}
            <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="card" style={{ padding: '1rem', borderLeft: dashboardData.calories > 2000 ? '4px solid var(--warning)' : '4px solid var(--primary)' }}>
                <div style={{ color: 'var(--text-light)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Calories</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.25rem', color: dashboardData.calories > 2000 ? 'var(--warning)' : 'var(--text)' }}>
                  {dashboardData.calories} <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-light)' }}>/ 2000</span>
                </div>
              </div>
              <div className="card" style={{ padding: '1rem', borderLeft: dashboardData.sleepScore < 70 ? '4px solid var(--warning)' : '4px solid #9B59B6' }}>
                <div style={{ color: 'var(--text-light)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Sleep Score</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.25rem', color: dashboardData.sleepScore < 70 ? 'var(--warning)' : 'var(--text)' }}>
                  {dashboardData.sleepScore} <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-light)' }}>/ 100</span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="card" style={{ padding: '1rem' }}>
              <h4 style={{ color: 'var(--secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={16} /> Updated Calorie Trend
              </h4>
              <div style={{ height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} domain={['dataMin - 200', 'dataMax + 200']} tick={{fontSize: 12}} />
                    <Tooltip cursor={{ stroke: 'var(--border)' }} contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="calories" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
