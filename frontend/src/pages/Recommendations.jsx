import React, { useState } from 'react';
import { Target, Leaf, Sparkles, Clock, Flame, Info } from 'lucide-react';

const Recommendations = () => {
  const [goal, setGoal] = useState('weight loss');
  const [diet, setDiet] = useState('non-vegetarian');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  // Hardcoded 18 unique meals to guarantee 100% different outputs for every combination
  const mealDatabase = [
    // --- NON-VEGETARIAN (Meat & Fish) ---
    // Weight Loss
    { type: 'Breakfast', goal: 'weight loss', diet: 'non-vegetarian', name: 'Egg White & Turkey Bacon', calories: 250, protein: 25, time: '10 min', image: '🍳' },
    { type: 'Lunch', goal: 'weight loss', diet: 'non-vegetarian', name: 'Grilled Chicken Salad', calories: 350, protein: 35, time: '15 min', image: '🥗' },
    { type: 'Dinner', goal: 'weight loss', diet: 'non-vegetarian', name: 'Baked Lemon Salmon', calories: 400, protein: 40, time: '25 min', image: '🐟' },
    // Muscle Gain
    { type: 'Breakfast', goal: 'muscle gain', diet: 'non-vegetarian', name: 'Steak & Eggs', calories: 550, protein: 45, time: '20 min', image: '🥩' },
    { type: 'Lunch', goal: 'muscle gain', diet: 'non-vegetarian', name: 'Chicken & Sweet Potato Bowl', calories: 600, protein: 50, time: '25 min', image: '🍗' },
    { type: 'Dinner', goal: 'muscle gain', diet: 'non-vegetarian', name: 'Lean Beef Pasta', calories: 650, protein: 55, time: '30 min', image: '🍝' },

    // --- VEGETARIAN (Dairy & Eggs allowed) ---
    // Weight Loss
    { type: 'Breakfast', goal: 'weight loss', diet: 'vegetarian', name: 'Greek Yogurt & Berries', calories: 200, protein: 15, time: '5 min', image: '🥣' },
    { type: 'Lunch', goal: 'weight loss', diet: 'vegetarian', name: 'Caprese Salad', calories: 300, protein: 12, time: '10 min', image: '🥗' },
    { type: 'Dinner', goal: 'weight loss', diet: 'vegetarian', name: 'Zucchini Noodles & Feta', calories: 320, protein: 14, time: '20 min', image: '🥒' },
    // Muscle Gain
    { type: 'Breakfast', goal: 'muscle gain', diet: 'vegetarian', name: 'Protein Oat Pancakes', calories: 450, protein: 30, time: '20 min', image: '🥞' },
    { type: 'Lunch', goal: 'muscle gain', diet: 'vegetarian', name: 'Paneer Tikka & Quinoa', calories: 550, protein: 35, time: '25 min', image: '🥘' },
    { type: 'Dinner', goal: 'muscle gain', diet: 'vegetarian', name: 'Lentil Pasta & Cheese', calories: 500, protein: 32, time: '20 min', image: '🧀' },

    // --- VEGAN (Strictly Plant-Based) ---
    // Weight Loss
    { type: 'Breakfast', goal: 'weight loss', diet: 'vegan', name: 'Chia Seed Pudding', calories: 220, protein: 8, time: '5 min', image: '🥄' },
    { type: 'Lunch', goal: 'weight loss', diet: 'vegan', name: 'Mixed Green Bean Salad', calories: 280, protein: 10, time: '10 min', image: '🥬' },
    { type: 'Dinner', goal: 'weight loss', diet: 'vegan', name: 'Tofu Cauliflower Rice', calories: 310, protein: 15, time: '20 min', image: '🍚' },
    // Muscle Gain
    { type: 'Breakfast', goal: 'muscle gain', diet: 'vegan', name: 'High-Protein Tofu Scramble', calories: 400, protein: 28, time: '15 min', image: '🍳' },
    { type: 'Lunch', goal: 'muscle gain', diet: 'vegan', name: 'Tempeh & Black Bean Wrap', calories: 520, protein: 30, time: '15 min', image: '🌯' },
    { type: 'Dinner', goal: 'muscle gain', diet: 'vegan', name: 'Seitan & Broccoli Stir-fry', calories: 580, protein: 45, time: '25 min', image: '🥡' }
  ];

  const getReasoning = (goal, diet, meal) => {
    if (goal === 'weight loss') return `Low-calorie ${diet} option (${meal.calories} kcal) designed to keep you in a deficit.`;
    if (goal === 'muscle gain') return `High-protein ${diet} meal packed with ${meal.protein}g of protein for muscle synthesis.`;
    return 'Balanced nutrition.';
  };

  const fetchRecommendations = () => {
    setLoading(true);
    setAnalyzed(false);
    
    setTimeout(() => {
      // Direct 1-to-1 matching to ensure exact, unique results
      // If goal is "general health", we map it to "weight loss" for the sake of the mock DB to avoid empty states
      const searchGoal = goal === 'general health' ? 'weight loss' : goal;
      
      const breakfast = mealDatabase.find(m => m.type === 'Breakfast' && m.goal === searchGoal && m.diet === diet);
      const lunch = mealDatabase.find(m => m.type === 'Lunch' && m.goal === searchGoal && m.diet === diet);
      const dinner = mealDatabase.find(m => m.type === 'Dinner' && m.goal === searchGoal && m.diet === diet);

      setMeals([breakfast, lunch, dinner]);
      
      setAnalyzed(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles color="var(--primary)" /> Smart Meal Recommendations
          </h1>
          <p style={{ color: 'var(--text-light)', marginTop: '0.25rem' }}>AI-curated daily plans tailored to your specific goals and dietary needs.</p>
        </div>
      </div>
      
      <div className="card" style={{ marginBottom: '2rem', borderTop: '4px solid var(--primary)' }}>
        <div className="grid-2" style={{ gap: '2rem' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: 600 }}>
              <Target size={18} color="var(--primary)" /> Your Primary Goal
            </label>
            <select 
              style={{ width: '100%', padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--background)', fontSize: '1rem' }}
              value={goal} onChange={e => setGoal(e.target.value)}
            >
              <option value="weight loss">Weight Loss</option>
              <option value="muscle gain">Muscle Gain</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: 600 }}>
              <Leaf size={18} color="var(--secondary)" /> Dietary Preference
            </label>
            <select 
              style={{ width: '100%', padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--background)', fontSize: '1rem' }}
              value={diet} onChange={e => setDiet(e.target.value)}
            >
              <option value="non-vegetarian">Non-Vegetarian (Meat & Fish)</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
        </div>
        <button 
          onClick={fetchRecommendations}
          disabled={loading}
          style={{ 
            marginTop: '2rem', width: '100%', padding: '1rem', 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
            color: 'white', border: 'none', borderRadius: '0.5rem', 
            fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)',
            transition: 'transform 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
          }}
          onMouseOver={e => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseOut={e => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
        >
          {loading ? <><Sparkles className="spin" size={20} /> Generating Custom Plan...</> : <><Sparkles size={20} /> Build My Personalized Menu</>}
        </button>
      </div>

      {analyzed && meals.length > 0 && meals[0] && (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(46, 204, 113, 0.1)', borderRadius: '0.5rem', color: 'var(--primary)', fontWeight: 600 }}>
            <Sparkles size={20} /> AI Analysis Complete: Designed for {goal} ({diet})
          </div>
          
          <div className="grid-3">
            {meals.map((meal, index) => (
              <div key={index} className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary)' }} />
                
                <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{meal.type}</span>
                  <span style={{ background: 'var(--background)', padding: '0.25rem 0.75rem', borderRadius: '1rem', color: 'var(--text)' }}>
                    Day 1
                  </span>
                </div>
                
                <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>{meal.image}</div>
                
                <h3 style={{ marginBottom: '1rem', flex: 1, textAlign: 'center', fontSize: '1.25rem' }}>{meal.name}</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text)', fontSize: '0.875rem', padding: '1rem', background: 'var(--background)', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}><Flame size={16} color="var(--error)" /> {meal.calories} kcal</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}><Target size={16} color="var(--primary)" /> {meal.protein}g protein</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}><Clock size={16} color="var(--secondary)" /> {meal.time}</span>
                </div>

                <div style={{ fontSize: '0.875rem', color: 'var(--secondary)', borderTop: '1px dashed var(--border)', paddingTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ lineHeight: '1.4' }}><strong>Why it fits:</strong> {getReasoning(goal, diet, meal)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
