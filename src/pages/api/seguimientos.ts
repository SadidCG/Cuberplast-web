import type { APIContext } from "astro";
import { Pedidos, db } from 'astro:db';
import { generateId } from "lucia";

export async function POST(context: APIContext): Promise<Response> {
    try {
        const formData = await context.request.formData();
        const producto = formData.get("producto")?.toString() || "";
        const cantidad = formData.get("cantidad")?.toString() || "";
        const direccion = formData.get("direccion1")?.toString() || ""; // Aquí corregido
        const destino = formData.get("destino1")?.toString() || "";
        const localidad = formData.get("localidad");

        const pedidosId = generateId(15);
        console.log(producto, cantidad, direccion, destino, localidad, pedidosId);
        if (!producto || !cantidad || !direccion || !destino || !localidad) {
            return new Response("Debe llenar todos los campos", { status: 400 });
        }

        await db.insert(Pedidos).values({
            id: pedidosId,
            nombre_producto: producto,
            cantidad: cantidad,
            destino: destino,
            direccion: direccion,
            localidad_id: localidad
        }).run();

        // Redireccionar al usuario a la página de seguimientosUsuario.astro
        return new Response(null, { status: 303, headers: { "Location": "/seguimientosUsuario" } });
    } catch (error) {
        console.error("Error al procesar el formulario:", error);
        return new Response("Error interno del servidor", { status: 500 });
    }
}
