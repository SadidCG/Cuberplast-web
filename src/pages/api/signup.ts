import type { APIContext } from "astro";
import { Argon2id } from "oslo/password";
import { db, usuario } from 'astro:db';
import { generateId } from "lucia";

async function generateResponse(message: string, statusCode: number = 200): Promise<Response> {
    const backButton = `<button onclick="window.history.back();">Regresar</button>`;
    const responseText = `${message}<br>${backButton}`;
    return new Response(responseText, { status: statusCode, headers: { "Content-Type": "text/html" } });
}

export async function POST(context: APIContext): Promise<Response> {
    try {
        const formData = await context.request.formData();
        const nombres1 = formData.get("nombres1")?.toString() || "";
        const apellidos1 = formData.get("apellidos1")?.toString() || "";
        const usuario1 = formData.get("usuario1")?.toString() || "";
        const contraseña1 = formData.get("contraseña1")?.toString() || "";
        const rolId = formData.get("rol1");

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
        const userId = generateId(15);

        await db.insert(usuario).values({
            id: userId,
            nombres: nombres1,
            apellidos: apellidos1,
            user: usuario1,
            contraseña: hashedContraseña,
            rol_id: rolId
        }).run();

        console.log(nombres1, apellidos1, usuario1, contraseña1, rolId);

        // Redireccionar al usuario a la página de usuarios.astro
        return new Response(null, { status: 303, headers: { "Location": "/usuarios" } });
    } catch (error) {
        console.error("Error al procesar el formulario:", error);
        return await generateResponse("Error interno del servidor", 500);
    }
}
