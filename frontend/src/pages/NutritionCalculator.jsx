import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, ArrowRight, Zap } from 'lucide-react';

const NutritionCalculator = () => {
  const [search, setSearch] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [smartSwap, setSmartSwap] = useState(null);

  const mockFoods = [
    { name: 'Avocado (1 medium)', calories: 240, protein: 3, carbs: 12, fats: 22, isHealthy: true },
    { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fats: 3.6, isHealthy: true },
    { name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fats: 1.8, isHealthy: true },
    { 
      name: 'Potato Chips (1 bag)', 
      calories: 536, protein: 5, carbs: 53, fats: 35, 
      isHealthy: false,
      swapId: 'popcorn'
    },
    { 
      name: 'Air-Popped Popcorn (3 cups)', 
      id: 'popcorn',
      calories: 93, protein: 3, carbs: 19, fats: 1.1, 
      isHealthy: true 
    },
    {
      name: 'Milk Chocolate Bar',
      calories: 210, protein: 3, carbs: 26, fats: 13,
      isHealthy: false,
      swapId: 'dark_chocolate'
    },
    {
      name: 'Dark Chocolate (70% Cacao)',
      id: 'dark_chocolate',
      calories: 170, protein: 2, carbs: 13, fats: 12,
      isHealthy: true
    }
  ];

  const handleSearch = () => {
    const food = mockFoods.find(f => f.name.toLowerCase().includes(search.toLowerCase()) && !f.id); // don't return swap targets directly
    if(food) {
      setSelectedFood(food);
      if (!food.isHealthy && food.swapId) {
        setSmartSwap(mockFoods.find(f => f.id === food.swapId));
      } else {
        setSmartSwap(null);
      }
    }
  };

  const handleApplySwap = () => {
    if (smartSwap) {
      setSelectedFood(smartSwap);
      setSmartSwap(null);
      setSearch(smartSwap.name);
    }
  };

  const COLORS = ['#2ECC71', '#3498DB', '#E74C3C'];

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Nutrition Calculator & Smart Swaps</h1>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Search for a food item (try 'Potato Chips' or 'Chocolate')..." 
            style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn" onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* Smart Swap Recommendation */}
      {smartSwap && (
        <div className="card" style={{ 
          marginBottom: '2rem', 
          background: 'linear-gradient(to right, rgba(46, 204, 113, 0.1), rgba(52, 152, 219, 0.1))',
          border: '1px solid var(--primary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '50%', color: 'white' }}>
              <Zap size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: 'var(--text)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} color="var(--warning)" /> Smart Swap Detected
              </h3>
              <p style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>
                <strong>{selectedFood.name}</strong> is high in empty calories and fats. 
                Consider swapping it for <strong>{smartSwap.name}</strong> to save {(selectedFood.calories - smartSwap.calories)} calories!
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', opacity: 0.7 }}>
                  {selectedFood.calories} kcal
                </div>
                <ArrowRight size={20} color="var(--primary)" />
                <div style={{ background: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
                  {smartSwap.calories} kcal
                </div>
                <button className="btn" onClick={handleApplySwap} style={{ marginLeft: 'auto' }}>
                  Apply Swap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedFood && (
        <div className="grid-2">
          <div className="card">
            <h2 style={{ marginBottom: '0.5rem' }}>{selectedFood.name}</h2>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: selectedFood.isHealthy ? 'var(--primary)' : 'var(--error)', marginBottom: '1.5rem' }}>
              {selectedFood.calories} <span style={{ fontSize: '1rem', color: 'var(--text-light)', fontWeight: 'normal' }}>kcal</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Protein</span>
                <span style={{ fontWeight: 600 }}>{selectedFood.protein}g</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Carbs</span>
                <span style={{ fontWeight: 600 }}>{selectedFood.carbs}g</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Fats</span>
                <span style={{ fontWeight: 600 }}>{selectedFood.fats}g</span>
              </div>
            </div>
          </div>
          
          <div className="card" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Protein', value: selectedFood.protein },
                    { name: 'Carbs', value: selectedFood.carbs },
                    { name: 'Fats', value: selectedFood.fats }
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[0, 1, 2].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionCalculator;
