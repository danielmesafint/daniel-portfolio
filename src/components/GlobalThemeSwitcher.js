import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

const THEME_OPTIONS = [
  { id: 'default', name: 'Default', description: 'Calm navy with blue accents', swatch: 'linear-gradient(90deg, #3b82f6, #38bdf8)' },
  { id: 'grido', name: 'GRIDO', description: 'Blue and purple gradient', swatch: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' },
  { id: 'cyber', name: 'Cyber', description: 'Neon cyberpunk', swatch: 'linear-gradient(90deg, #00ff88, #00d4ff)' },
  { id: 'sunset', name: 'Sunset', description: 'Warm sunset colours', swatch: 'linear-gradient(90deg, #f97316, #ef4444)' },
  { id: 'ocean', name: 'Ocean', description: 'Deep ocean blues', swatch: 'linear-gradient(90deg, #0ea5e9, #06b6d4)' }
];

const GlobalThemeSwitcher = ({ currentTheme, changeTheme }) => {
  const [themeOpen, setThemeOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close the menu when clicking outside it or pressing Escape
  useEffect(() => {
    if (!themeOpen) return undefined;
    const onDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setThemeOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setThemeOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [themeOpen]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setThemeOpen(!themeOpen)}
        aria-haspopup="true"
        aria-expanded={themeOpen}
        aria-label="Change colour theme"
        title="Change colour theme"
        className="p-2 bg-slate-800/80 backdrop-blur-md border-2 border-blue-400 rounded-lg hover:bg-slate-700/80 transition-all duration-200 shadow-lg"
        style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}
      >
        <img
          src="/theme_switcher_icon.png"
          alt=""
          className="w-8 h-8 object-contain"
          loading="eager"
        />
      </button>

      {themeOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-64 rounded-lg shadow-xl py-2 border border-slate-700/60"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.98)', zIndex: 70 }}
        >
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-slate-700/50">
            Colour theme
          </div>
          {THEME_OPTIONS.map((theme) => {
            const active = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  if (changeTheme) changeTheme(theme.id);
                  setThemeOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-slate-700/60 flex items-center gap-3 ${
                  active ? 'text-white' : 'text-gray-300'
                }`}
              >
                <span className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: theme.swatch }} />
                <span className="flex-1">
                  <span className="block font-medium">{theme.name}</span>
                  <span className="block text-xs text-gray-400">{theme.description}</span>
                </span>
                {active && <Check size={16} className="flex-shrink-0" style={{ color: '#a3e635' }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GlobalThemeSwitcher;
