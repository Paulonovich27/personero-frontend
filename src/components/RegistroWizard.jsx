import React, { useState } from 'react';
import { db } from '../db'; // <-- Importamos nuestra base de datos

const RegistroWizard = () => {
  const [paso, setPaso] = useState(1);
  const totalPasos = 3;

  // 1. Ampliamos el estado para incluir provincia y distrito
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    telefono: '',
    provincia: '',
    distrito: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const siguientePaso = () => {
    if (paso < totalPasos) setPaso(paso + 1);
  };

  const pasoAnterior = () => {
    if (paso > 1) setPaso(paso - 1);
  };

  // Función para guardar localmente (Offline)
  const handleSubmit = async () => {
    try {
      await db.registros.add({
        ...formData,
        sincronizado: 0, // 0 = pendiente de enviar al servidor
        fecha: new Date().toISOString()
      });

      alert(`¡Registro guardado exitosamente, ${formData.nombres}! Se sincronizará automáticamente cuando tengas conexión.`);
      
      // Reiniciamos el formulario al paso 1
      setFormData({
        dni: '', nombres: '', telefono: '', provincia: '', distrito: ''
      });
      setPaso(1);

    } catch (error) {
      console.error("Error al guardar en la base de datos local:", error);
      alert("Hubo un error al guardar tus datos localmente.");
    }
  };

  // NUEVA FUNCIÓN: Sincronizar datos con la API de C#
  const sincronizarDatos = async () => {
    try {
      // 1. Buscamos en la base de datos offline los que no se han enviado
      const pendientes = await db.registros.where({ sincronizado: 0 }).toArray();

      if (pendientes.length === 0) {
        alert("No hay registros nuevos pendientes de enviar.");
        return;
      }

      // 2. Enviamos los datos al API en C# (Usando tu puerto 7159)
      const response = await fetch('https://localhost:7159/api/registros/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendientes)
      });

      if (response.ok) {
        // 3. Si el API responde OK, los marcamos como enviados en el celular
        await db.registros.where({ sincronizado: 0 }).modify({ sincronizado: 1 });
        alert(`¡Sincronización exitosa! ${pendientes.length} registros enviados a la base de datos central en Neon.`);
      } else {
        alert("El servidor rechazó los datos. Verifica la conexión.");
      }
    } catch (error) {
      console.error("Error al sincronizar:", error);
      alert("No se pudo conectar con el API. Asegúrate de tener internet y que el API esté corriendo.");
    }
  };

  // Lista de provincias de Amazonas
  const provinciasAmazonas = [
    "Chachapoyas", "Bagua", "Bongará", "Condorcanqui", 
    "Luya", "Rodríguez de Mendoza", "Utcubamba"
  ];

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mt-8 border border-gray-100">
      
      {/* Barra de Progreso Superior */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-colors z-10 ${
              paso >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Contenido Dinámico de los Pasos */}
      <div className="min-h-[280px]">
        
        {/* --- PASO 1: Datos Personales --- */}
        {paso === 1 && (
          <div className="space-y-5 text-left animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Paso 1: Datos Personales</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">DNI *</label>
              <input type="text" name="dni" maxLength="8" value={formData.dni} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm bg-gray-50" placeholder="Ingresa tus 8 dígitos" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nombres y Apellidos *</label>
              <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm bg-gray-50" placeholder="Ej. Juan Pérez" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Celular / Teléfono *</label>
              <input type="tel" name="telefono" maxLength="9" value={formData.telefono} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm bg-gray-50" placeholder="Ej. 987654321" />
            </div>
          </div>
        )}

        {/* --- PASO 2: Ubicación Electoral --- */}
        {paso === 2 && (
          <div className="space-y-5 text-left animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Paso 2: Ubicación Electoral</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Provincia *</label>
              <select name="provincia" value={formData.provincia} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm bg-gray-50 cursor-pointer">
                <option value="">Selecciona una provincia...</option>
                {provinciasAmazonas.map(prov => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Distrito *</label>
              <input type="text" name="distrito" value={formData.distrito} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm bg-gray-50" placeholder="Escribe tu distrito" />
            </div>
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mt-4">
              <p className="text-sm text-blue-800"><span className="font-bold">Nota:</span> Se te asignará preferentemente un local de votación cercano a este distrito.</p>
            </div>
          </div>
        )}

        {/* --- PASO 3: Confirmación --- */}
        {paso === 3 && (
          <div className="text-left animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Paso 3: Confirmación</h3>
            <p className="text-gray-600 mb-6">Por favor, verifica que tus datos sean correctos antes de finalizar.</p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-500 font-bold uppercase tracking-wider">DNI</p><p className="font-semibold text-gray-800 text-lg">{formData.dni || 'No ingresado'}</p></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Teléfono</p><p className="font-semibold text-gray-800 text-lg">{formData.telefono || 'No ingresado'}</p></div>
              <div className="md:col-span-2"><p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Nombres y Apellidos</p><p className="font-semibold text-gray-800 text-lg">{formData.nombres || 'No ingresado'}</p></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Provincia</p><p className="font-semibold text-gray-800 text-lg">{formData.provincia || 'No ingresado'}</p></div>
              <div><p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Distrito</p><p className="font-semibold text-gray-800 text-lg">{formData.distrito || 'No ingresado'}</p></div>
            </div>
          </div>
        )}
      </div>

      {/* Botones de Navegación Inferiores */}
      <div className="flex justify-between mt-10 pt-4 border-t border-gray-100">
        <button
          onClick={pasoAnterior}
          disabled={paso === 1}
          className={`px-6 py-2 rounded-md font-semibold transition-colors ${paso === 1 ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Anterior
        </button>
        
        {paso < totalPasos ? (
          <button onClick={siguientePaso} className="bg-blue-600 text-white px-8 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
            Siguiente
          </button>
        ) : (
          <button onClick={handleSubmit} className="bg-green-600 text-white px-8 py-2 rounded-md font-bold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg">
            Finalizar Registro
          </button>
        )}
      </div>

      {/* NUEVO BOTÓN DE SINCRONIZACIÓN MANUAL (Aparece abajo del todo) */}
      <div className="mt-8 text-center border-t border-gray-200 pt-6">
        <button 
          onClick={sincronizarDatos}
          className="bg-indigo-100 text-indigo-700 font-semibold px-6 py-2 rounded-full hover:bg-indigo-200 transition-colors flex items-center justify-center mx-auto gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Sincronizar Datos Pendientes
        </button>
      </div>

    </div>
  );
};

export default RegistroWizard;