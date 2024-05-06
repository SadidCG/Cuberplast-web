import type { APIContext } from "astro";
import { Argon2id } from "oslo/password";
import { db, usuario } from 'astro:db';

async function generateResponse(message: string, statusCode: number = 200): Promise<Response> {
    const backButton = `<button onclick="window.history.back();">Regresar</button>`;
    const responseText = `${message}<br>${backButton}`;
    return new Response(responseText, { status: statusCode, headers: { "Content-Type": "text/html" } });
}

export async function PUT(context: APIContext): Promise<Response> {
    try {
        const formData = await context.request.formData();
        const userId = formData.get("id")?.toString() || ""; // Obtener el ID del usuario a actualizar
        const nombres1 = formData.get("nombres1")?.toString() || "";
        const apellidos1 = formData.get("apellidos1")?.toString() || "";
        const usuario1 = formData.get("usuario1")?.toString() || "";
        const contraseña1 = formData.get("contraseña1")?.toString() || "";
        const rolId = formData.get("rol1");

        if (!userId) {
            return await generateResponse("ID de usuario no proporcionado", 400);
        }

        if (!usuario1 || !contraseña1 || !nombres1 || !apellidos1 || !rolId) {
            return await generateResponse("Debe llenar todos los campos", 400);
        }

        if (nombres1.length < 2) {
            return await generateResponse("El nombre debe tener al menos dos caracteres", 400);
        }

        if (apellidos1.length < 2) {
            return await generateResponse("Los apellidos deben tener al menos dos caracteres", 400);
        }

        if (usuario1.length < 4) {
            return await generateResponse("El usuario debe tener al menos cuatro caracteres", 400);
        }

        if (contraseña1.length < 6) {
            return await generateResponse("La contraseña debe tener al menos seis caracteres", 400);
        }

        const hashedContraseña = await new Argon2id().hash(contraseña1);

        await db.update(usuario).set({
            nombres: nombres1,
            apellidos: apellidos1,
            user: usuario1,
            contraseña: hashedContraseña,
            rol_id: rolId
        }).where({ id: userId }).run();

        // Redireccionar al usuario a la página de usuarios.astro
        return new Response(null, { status: 303, headers: { "Location": "/usuarios" } });
    } catch (error) {
        console.error("Error al procesar el formulario:", error);
        return await generateResponse("Error interno del servidor", 500);
    }
}
