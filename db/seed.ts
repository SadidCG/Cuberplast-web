import { db, usuario, } from 'astro:db';

console.log(usuario);

export default async function seedDatabase() {
  // Aquí puedes definir los datos que deseas insertar en tu base de datos
  const usuarios = [
    { name: 'Juan', lastname: 'Pérez', user: 'juanito', password: '123456', role: 'user' },
    { name: 'María', lastname: 'Gómez', user: 'maria', password: 'password', role: 'admin' },
    // Puedes agregar más datos de usuario según sea necesario
  ];

  // Insertar los datos en la colección de usuarios
  try {
    for (const formData of usuarios) {
      await db.insert(usuario);
    }
    console.log('Datos semilla insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar datos semilla:', error);
  }
}

// Llamar a la función para sembrar la base de datos
seedDatabase();
