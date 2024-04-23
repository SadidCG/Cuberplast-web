// Importa los módulos necesarios
import type { APIRoute } from 'astro';
import { db, usuario, eq } from 'astro:db';

// Define el nuevo endpoint DELETE
export const eliminarUsuario: APIRoute = async (ctx) => {

    try {
        // Obtiene el ID del usuario a eliminar de los parámetros de la solicitud
        const userId = ctx.params.id;
    
        // Elimina el usuario de la base de datos
        await db.delete(usuario).where(eq(usuario.id, userId));
    
        // Devuelve una respuesta exitosa
        return new Response(null, { status: 204 });
      } catch (error) {
        // Si hay un error, devuelve una respuesta de error
        return new Response(JSON.stringify({ error: 'No se pudo eliminar el usuario.' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    };