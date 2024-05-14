import type { APIRoute } from "astro";
import { usuario, db, eq } from "astro:db";

export const DELETE: APIRoute = async ({ url }) => {
    const id = Number(url.searchParams.get('id'));

    if (!id) {
        return new Response(
            JSON.stringify({
                message: "Please provide all required fields.",
                success: false,
            }),
            {
                status: 404,
            },
        );
    }

    try {
        const res = await db.delete(usuario).where(eq(usuario.id, id));
        if (res) {
            return new Response(null, { status: 204 });
        } else {
            throw new Error("User not found or could not be deleted");
        }
    } catch (e) {
        console.error(e);
        
        const errorMessage = e instanceof Error ? e.message : "Internal Server Error";
        return new Response(
            JSON.stringify({
                message: errorMessage,
                success: false,
            }),
            {
                status: 500,
            },
        );
    }
};
