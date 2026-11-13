import Dexie from 'dexie';

// Creamos la base de datos llamada 'PersonerosDB'
export const db = new Dexie('PersonerosDB');

// Definimos la tabla 'registros' y sus columnas principales.
// '++id' significa que será auto-incremental.
// 'sincronizado' nos servirá luego para saber si ya se envió a la API en C# (0 = No, 1 = Sí).
db.version(1).stores({
  registros: '++id, dni, nombres, telefono, provincia, distrito, sincronizado, fecha'
});