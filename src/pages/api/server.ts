// server.js

const express = require('express');
const { db, usuario, eq } = require('astro:db');

const app = express();

// Endpoint para eliminar un usuario
app.delete('/eliminarUsuario/:id', async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (): void; new(): any; }; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
  try {
    const userId = req.params.id;
    await db.delete(usuario).where(eq(usuario.id, userId));
    res.status(204).send(); // Envía una respuesta exitosa sin contenido
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'No se pudo eliminar el usuario.' }); // Envía una respuesta de error
  }
});

// Otros endpoints...

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
