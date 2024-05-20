import type { APIRoute } from 'astro';
import { db, eq } from 'astro:db';
import { usuario } from 'astro:db';

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json();

    // Lógica para eliminar el usuario utilizando Drezzle
    if (typeof id === 'string') {
      await db.delete(usuario).where(eq(usuario.id, id));
    } else {
      throw new Error('Invalid id');
    }

    return new Response(JSON.stringify({ message: 'User deleted successfully!' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in DELETE route:', error);
    return new Response(JSON.stringify({ message: 'Failed to delete user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};