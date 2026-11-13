import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 py-12 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Columna 1: Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
              U
            </div>
            <span className="font-bold text-xl text-white tracking-tight">Unidos al Campo</span>
          </div>
          <p className="text-sm text-slate-400">
            Plataforma oficial de registro y gestión de personeros para la Segunda Vuelta Electoral 2026 en la Región Amazonas.
          </p>
        </div>
        
        {/* Columna 2: Enlaces */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold text-white">Enlaces Rápidos</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
            <li><a href="#propuestas" className="hover:text-white transition-colors">Nuestras Propuestas</a></li>
            <li><a href="#registro" className="hover:text-white transition-colors">Inscripción de Personeros</a></li>
          </ul>
        </div>
        
        {/* Columna 3: Contacto */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold text-white">Contacto</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>📍 Chachapoyas, Amazonas</li>
            <li>✉️ contacto@unidosalcampo.pe</li>
            <li>📱 +51 987 654 321</li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Unidos al Campo. Todos los derechos reservados.
      </div>
    </footer>
  );
}