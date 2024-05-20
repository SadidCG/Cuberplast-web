import type { APIRoute } from 'astro';
import { db, eq } from 'astro:db';
import { usuario } from 'astro:db';



export const PUT: APIRoute = async ({ request }) => {
  try {
    const { id, name } = await request.json();

    // Lógica para actualizar el usuario utilizando Drezzle
    if (typeof id === 'string' && typeof name === 'string') {
      await db.update(usuario).set({ nombres: name }).where(eq(usuario.id, id));
    } else {
      throw new Error('Invalid id or name');
    }

    return new Response(JSON.stringify({ message: 'User updated successfully!' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in PUT route:', error);
    return new Response(JSON.stringify({ message: 'Failed to update user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
