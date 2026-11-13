import React from 'react';

export default function Hero() {
  const scrollToRegistro = () => {
    document.getElementById('registro').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 min-h-screen flex items-center">
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide border border-blue-100 mb-6 animate-fade-in">
          Elecciones 2026 - Región Amazonas
        </span>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
          Defiende el voto, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            asegura nuestro futuro.
          </span>
        </h1>
        
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Tu presencia en mesa hace la diferencia. Súmate como Personero Voluntario y garanticemos la transparencia electoral en nuestras 7 provincias.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={scrollToRegistro}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-600/30 transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Inscribirme ahora
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
          <a 
            href="#propuestas"
            className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center"
          >
            Conocer más
          </a>
        </div>
      </div>
    </section>
  );
}