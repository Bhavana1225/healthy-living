import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Apple, Activity, Heart, Leaf } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem'
    }}>
      
      {/* Decorative Floating Elements */}
      <div style={{ position: 'absolute', top: '15%', left: '15%', animation: 'float 6s ease-in-out infinite', opacity: 0.8 }}>
        <div style={{ background: 'rgba(255,255,255,0.3)', padding: '1.5rem', borderRadius: '50%', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(31,38,135,0.1)' }}>
          <Apple size={40} color="var(--primary-dark)" />
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: '20%', right: '15%', animation: 'float 8s ease-in-out infinite', animationDelay: '1s', opacity: 0.8 }}>
        <div style={{ background: 'rgba(255,255,255,0.3)', padding: '1.5rem', borderRadius: '50%', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(31,38,135,0.1)' }}>
          <Activity size={40} color="#8E44AD" />
        </div>
      </div>

      <div style={{ position: 'absolute', top: '25%', right: '25%', animation: 'float 7s ease-in-out infinite', animationDelay: '2s', opacity: 0.8 }}>
        <div style={{ background: 'rgba(255,255,255,0.3)', padding: '1.25rem', borderRadius: '50%', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(31,38,135,0.1)' }}>
          <Leaf size={30} color="#2ecc71" />
        </div>
      </div>

      {/* Main Glassmorphic Hero Card */}
      <div className="card" style={{ 
        maxWidth: '800px', 
        width: '100%', 
        textAlign: 'center', 
        padding: '4rem 2rem',
        background: 'rgba(255, 255, 255, 0.65)',
        position: 'relative',
        zIndex: 10,
        animation: 'fadeIn 1s ease-out'
      }}>
        


        <h1 style={{ 
          fontSize: '4.5rem', 
          fontWeight: 800, 
          lineHeight: '1.1', 
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #3a7bd5, #00d2ff, #8E44AD)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Eat Right.<br/>Live Healthy.
        </h1>

        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-light)', 
          marginBottom: '3rem', 
          maxWidth: '600px', 
          margin: '0 auto 3rem auto',
          lineHeight: '1.6'
        }}>
          Transform your lifestyle with personalized AI meal plans, smart nutrition tracking, and real-time biometric health nudges.
        </p>

        <button 
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
            color: 'white',
            border: 'none',
            padding: '1.25rem 3rem',
            fontSize: '1.25rem',
            fontWeight: 700,
            borderRadius: '3rem',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(58, 123, 213, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Get Started <ArrowRight size={24} />
        </button>

      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default Landing;
