import React from 'react';
import RegistroWizard from '../RegistroWizard';

export default function Registro() {
  return (
    <section id="registro" className="min-h-screen flex flex-col items-center py-24 bg-slate-50 px-6 w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Inscribirme como Personero</h2>
      <p className="text-gray-600 text-lg mb-4 text-center max-w-xl">
        Completa este formulario en 3 sencillos pasos. Tu compromiso es vital para la transparencia electoral.
      </p>
      
      {/* Aquí inyectamos el componente Wizard */}
      <RegistroWizard />
    </section>
  );
}