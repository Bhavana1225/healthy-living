import React, { useState } from 'react';
import { Plus, ShoppingCart, Sparkles, CheckCircle2, Calendar, X, Utensils } from 'lucide-react';

const DietPlanner = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  
  const [activeDay, setActiveDay] = useState('Monday');
  const [showGrocery, setShowGrocery] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [optimizationScore, setOptimizationScore] = useState(65);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectingMealType, setSelectingMealType] = useState(null);

  // Planned meals state
  const [plannedMeals, setPlannedMeals] = useState({
    Monday: {}, Tuesday: {}, Wednesday: {}, Thursday: {}, Friday: {}, Saturday: {}, Sunday: {}
  });

  const availableMeals = [
    { id: 1, name: 'Oatmeal with Berries', calories: 300, type: 'Breakfast', image: '🥣' },
    { id: 2, name: 'Avocado Toast', calories: 250, type: 'Breakfast', image: '🥑' },
    { id: 3, name: 'Grilled Chicken Salad', calories: 400, type: 'Lunch', image: '🥗' },
    { id: 4, name: 'Turkey Wrap', calories: 350, type: 'Lunch', image: '🌯' },
    { id: 5, name: 'Quinoa Veggie Bowl', calories: 450, type: 'Dinner', image: '🥘' },
    { id: 6, name: 'Baked Salmon & Asparagus', calories: 500, type: 'Dinner', image: '🐟' },
    { id: 7, name: 'Protein Shake', calories: 200, type: 'Snacks', image: '🥤' },
    { id: 8, name: 'Greek Yogurt & Almonds', calories: 150, type: 'Snacks', image: '🥜' }
  ];

  const [groceries, setGroceries] = useState([
    { id: 1, name: 'White Rice', amount: '2 lbs', swapTarget: 'Quinoa', swapReason: 'Higher protein, lower glycemic index', image: '🍚' },
    { id: 2, name: 'Vegetable Oil', amount: '1 bottle', swapTarget: 'Extra Virgin Olive Oil', swapReason: 'Healthy fats, anti-inflammatory', image: '🛢️' },
    { id: 3, name: 'Chicken Breast', amount: '3 lbs', image: '🍗' },
    { id: 4, name: 'Broccoli', amount: '2 heads', image: '🥦' },
    { id: 5, name: 'Sugary Cereal', amount: '1 box', swapTarget: 'Rolled Oats', swapReason: 'No added sugar, complex carbs', image: '🥣' },
    { id: 6, name: 'Almond Milk', amount: '1 carton', image: '🥛' }
  ]);

  const openMealModal = (mealType) => {
    setSelectingMealType(mealType);
    setIsModalOpen(true);
  };

  const selectMeal = (meal) => {
    setPlannedMeals({
      ...plannedMeals,
      [activeDay]: {
        ...plannedMeals[activeDay],
        [selectingMealType]: meal
      }
    });
    setIsModalOpen(false);
  };

  const removeMeal = (mealType, e) => {
    e.stopPropagation();
    const updatedDay = { ...plannedMeals[activeDay] };
    delete updatedDay[mealType];
    setPlannedMeals({
      ...plannedMeals,
      [activeDay]: updatedDay
    });
  };

  const handleScan = () => setScanned(true);

  const applySwap = (groceryId, swapTarget) => {
    setGroceries(groceries.map(g => {
      if (g.id === groceryId) {
        return { ...g, originalName: g.name, name: swapTarget, swapTarget: null, isSwapped: true };
      }
      return g;
    }));
    setOptimizationScore(prev => Math.min(100, prev + 12));
  };

  const plannedCount = Object.keys(plannedMeals[activeDay]).length;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar color="var(--primary)" /> Planner & Groceries
          </h1>
          <p style={{ color: 'var(--text-light)', marginTop: '0.25rem' }}>Manage your weekly meals and optimize your cart.</p>
        </div>
        <div style={{ display: 'flex', background: 'var(--surface)', padding: '0.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
          <button 
            className={!showGrocery ? "btn" : ""} 
            style={{ 
              background: !showGrocery ? 'var(--primary)' : 'transparent',
              color: !showGrocery ? 'white' : 'var(--text-light)',
              border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s'
            }}
            onClick={() => setShowGrocery(false)}
          >
            Meal Planner
          </button>
          <button 
            className={showGrocery ? "btn" : ""} 
            style={{ 
              background: showGrocery ? 'var(--primary)' : 'transparent',
              color: showGrocery ? 'white' : 'var(--text-light)',
              border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
            onClick={() => setShowGrocery(true)}
          >
            <ShoppingCart size={16} /> Grocery List
          </button>
        </div>
      </div>
      
      {!showGrocery ? (
        <>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1rem' }}>
            {days.map(day => {
              const dayCount = Object.keys(plannedMeals[day]).length;
              return (
                <button 
                  key={day}
                  style={{ 
                    padding: '0.75rem 1.5rem', 
                    borderRadius: '2rem', 
                    border: 'none', 
                    background: activeDay === day ? 'var(--secondary)' : 'white',
                    color: activeDay === day ? 'white' : 'var(--text)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    boxShadow: activeDay === day ? '0 4px 10px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                  onClick={() => setActiveDay(day)}
                >
                  {day}
                  {dayCount === 4 && (
                    <div style={{ position: 'absolute', top: -5, right: -5, background: 'var(--primary)', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                      <CheckCircle2 size={12} />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          <div className="card" style={{ borderTop: '4px solid var(--secondary)' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{activeDay}'s Schedule</span>
              <span style={{ 
                fontSize: '0.875rem', fontWeight: 'bold', 
                color: plannedCount === 4 ? 'white' : 'var(--primary)', 
                background: plannedCount === 4 ? 'var(--primary)' : 'rgba(46, 204, 113, 0.1)', 
                padding: '0.25rem 0.75rem', borderRadius: '1rem', transition: 'all 0.3s' 
              }}>
                {plannedCount}/4 Planned
              </span>
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {mealTypes.map(mealTime => {
                const isPlanned = plannedMeals[activeDay][mealTime];
                
                return (
                  <div key={mealTime} 
                    onClick={() => !isPlanned && openMealModal(mealTime)}
                    style={{ 
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                      padding: '1.25rem', 
                      background: isPlanned ? 'rgba(46, 204, 113, 0.05)' : 'var(--background)', 
                      borderRadius: '0.75rem',
                      border: isPlanned ? '1px solid var(--primary)' : '1px dashed var(--border)', 
                      transition: 'all 0.2s', 
                      cursor: isPlanned ? 'default' : 'pointer'
                    }} 
                    onMouseOver={e => !isPlanned && (e.currentTarget.style.borderColor = 'var(--primary)')} 
                    onMouseOut={e => !isPlanned && (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {isPlanned ? (
                        <div style={{ fontSize: '2.5rem' }}>{isPlanned.image}</div>
                      ) : (
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(46, 204, 113, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                          <Plus size={24} />
                        </div>
                      )}
                      
                      <div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.1rem', color: isPlanned ? 'var(--text)' : 'var(--secondary)' }}>{mealTime}</h3>
                        {isPlanned ? (
                          <div>
                            <span style={{ fontWeight: 600 }}>{isPlanned.name}</span>
                            <span style={{ color: 'var(--text-light)', marginLeft: '0.5rem', fontSize: '0.875rem' }}>• {isPlanned.calories} kcal</span>
                          </div>
                        ) : (
                          <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Tap to add {mealTime.toLowerCase()}</p>
                        )}
                      </div>
                    </div>
                    
                    {isPlanned && (
                      <button 
                        onClick={(e) => removeMeal(mealTime, e)}
                        style={{ background: 'white', border: '1px solid var(--error)', color: 'var(--error)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
          {/* Grocery list UI remains same as previous */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ marginBottom: '0.5rem' }}>Smart Grocery List</h2>
              <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Generated from your weekly meal plan.</p>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              {!scanned ? (
                <button 
                  onClick={handleScan}
                  style={{ 
                    background: 'linear-gradient(135deg, #8E44AD, #3498DB)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '2rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(142, 68, 173, 0.3)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Sparkles size={18} /> Autopilot Optimize
                </button>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    <CheckCircle2 size={18} /> Optimization Complete
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-light)' }}>Cart Health Score:</span>
                    <div style={{ width: '100px', height: '8px', background: 'var(--background)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${optimizationScore}%`, height: '100%', background: optimizationScore > 80 ? 'var(--primary)' : '#f39c12', transition: 'width 0.5s ease-out' }}></div>
                    </div>
                    <span style={{ fontWeight: 'bold' }}>{optimizationScore}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {groceries.map(item => (
              <div key={item.id} style={{ 
                padding: '1.25rem', border: '1px solid', borderColor: item.isSwapped ? 'var(--primary)' : 'var(--border)', 
                borderRadius: '0.75rem', background: item.isSwapped ? 'rgba(46, 204, 113, 0.05)' : 'white',
                position: 'relative', overflow: 'hidden', transition: 'all 0.3s'
              }}>
                {item.isSwapped && (
                  <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--primary)', color: 'white', fontSize: '0.7rem', padding: '0.2rem 0.75rem', borderBottomLeftRadius: '0.5rem', fontWeight: 'bold' }}>
                    UPGRADED
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '2rem' }}>{item.image}</div>
                    <div>
                      {item.isSwapped ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ textDecoration: 'line-through', color: 'var(--text-light)', fontSize: '0.8rem' }}>{item.originalName}</span>
                          <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.name}</span>
                        </div>
                      ) : (
                        <div style={{ fontWeight: 600, color: 'var(--text)' }}>{item.name}</div>
                      )}
                      <div style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>{item.amount}</div>
                    </div>
                  </div>
                </div>
                
                {scanned && item.swapTarget && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed var(--border)' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#8E44AD', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Sparkles size={14} /> Smart Swap
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div style={{ flex: 1, paddingRight: '1rem' }}>
                        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }}>{item.swapTarget}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem', lineHeight: '1.4' }}><span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Why:</span> {item.swapReason}</div>
                      </div>
                      <button 
                        onClick={() => applySwap(item.id, item.swapTarget)}
                        style={{ background: 'white', color: '#8E44AD', border: '1px solid #8E44AD', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.875rem', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                        onMouseOver={e => {e.currentTarget.style.background = '#8E44AD'; e.currentTarget.style.color = 'white'}} onMouseOut={e => {e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#8E44AD'}}
                      >
                        Apply Swap
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for selecting meals */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', width: '90%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Utensils color="var(--primary)" /> Select {selectingMealType}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="var(--text-light)" /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {availableMeals.filter(m => m.type === selectingMealType || m.type === 'Snacks').map(meal => (
                <div 
                  key={meal.id} 
                  onClick={() => selectMeal(meal)}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: '0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ fontSize: '2rem' }}>{meal.image}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{meal.name}</h4>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>{meal.calories} kcal</p>
                  </div>
                  <Plus color="var(--primary)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlanner;