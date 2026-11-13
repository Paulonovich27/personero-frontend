import React from 'react';

export default function Navbar() {
  const scrollToRegistro = () => {
    document.getElementById('registro').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Título */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="font-bold text-2xl text-gray-800 tracking-tight">
              Unidos al <span className="text-blue-600">Campo</span>
            </span>
          </div>

          {/* Enlaces de navegación (Ocultos en celulares pequeños) */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Inicio</a>
            <a href="#propuestas" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Propuestas</a>
            <button 
              onClick={scrollToRegistro}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Ser Personero
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}