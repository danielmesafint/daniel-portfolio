import React, { useState } from 'react';

const GlobalThemeSwitcher = ({ currentTheme, changeTheme }) => {
  const [themeOpen, setThemeOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-20">
      <div className="relative">
        <button
          onClick={() => setThemeOpen(!themeOpen)}
          className="p-3 bg-slate-800/80 backdrop-blur-md border-2 border-blue-400 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-slate-700/80 transition-all duration-200 shadow-lg animate-pulse"
          style={{
            animation: 'blinkBorder 2s infinite',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)'
          }}
          title="Theme Switcher"
        >
          <img
            src="/theme_switcher_icon.png"
            alt="Theme Switcher"
            className="w-10 h-10 transition-all duration-300 object-contain filter brightness-110 hover:brightness-125"
            style={{
              display: 'block !important',
              visibility: 'visible !important',
              opacity: '1 !important',
              minWidth: '40px',
              minHeight: '40px',
              maxWidth: '40px',
              maxHeight: '40px'
            }}
            loading="eager"
          />
        </button>
        
        {themeOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-lg shadow-xl py-2 z-30">
            <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-slate-700/50">
              Theme Switcher
            </div>
            <button
              onClick={() => {
                changeTheme && changeTheme('grido');
                setThemeOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 hover:bg-slate-700/50 ${
                currentTheme === 'grido'
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div>
                  <div className="font-medium">GRIDO</div>
                  <div className="text-xs text-gray-400">Blue/Purple gradient theme</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => {
                changeTheme && changeTheme('cyber');
                setThemeOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 hover:bg-slate-700/50 ${
                currentTheme === 'cyber'
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-cyan-400"></div>
                <div>
                  <div className="font-medium">Cyber</div>
                  <div className="text-xs text-gray-400">Neon cyberpunk theme</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => {
                changeTheme && changeTheme('sunset');
                setThemeOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 hover:bg-slate-700/50 ${
                currentTheme === 'sunset'
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
                <div>
                  <div className="font-medium">Sunset</div>
                  <div className="text-xs text-gray-400">Warm sunset colors</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => {
                changeTheme && changeTheme('ocean');
                setThemeOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 hover:bg-slate-700/50 ${
                currentTheme === 'ocean'
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <div>
                  <div className="font-medium">Ocean</div>
                  <div className="text-xs text-gray-400">Deep ocean blues</div>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalThemeSwitcher;