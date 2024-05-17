import { IncomingMessage, ServerResponse } from 'http';
import { db, usuario } from "astro:db";
import { eq } from "astro:db";

export async function GET({ request }: { request: IncomingMessage, response: ServerResponse }) {
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  const userId = url.searchParams.get('id');

  if (userId) {
    await db.delete(usuario).where(eq(usuario.id, userId)).run();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false, error: "User ID is required" }), { status: 400 });
  }
}
