import type { APIContext } from "astro";
import { Argon2id } from "oslo/password";
import {db, usuario,Roles}from 'astro:db';
import { generateId } from "lucia";
import { lucia } from "@/auth";


export async function POST(context: APIContext): Promise<Response> {
    try {
        const formData = await context.request.formData();
        const nombres1 = formData.get("nombres1")?.toString() || "";
        const apellidos1 = formData.get("apellidos1")?.toString() || "";
        const usuario1 = formData.get("usuarioform")?.toString() || "";
        const contraseña1 = formData.get("contraseña1")?.toString() || "";
        const rolId = Number(formData.get("rol1"));
        if(typeof usuario1 =="string" && contraseña1 =="string" && nombres1 =="string" && apellidos1 =="string" && rolId =="number"){
            
        }
        if (usuario1 || !contraseña1 || !nombres1 || !apellidos1 || isNaN(rolId)) {
            console.log(nombres1, apellidos1, usuario1, contraseña1, rolId);
            return new Response("Debe llenar todos los campos", { status: 400 });
        }

        if (nombres1.length < 2) {
            return new Response("El nombre debe tener al menos dos caracteres", { status: 400 });
        }

        if (apellidos1.length < 2) {
            return new Response("Los apellidos deben tener al menos dos caracteres", { status: 400 });
        }

        if (usuario1.length < 4) {
            return new Response("El usuario debe tener al menos cuatro caracteres", { status: 400 });
        }

        if (contraseña1.length < 6) {
            return new Response("La contraseña debe tener al menos seis caracteres", { status: 400 });
        }

        const hashedContraseña = await new Argon2id().hash(contraseña1);

        const userId = generateId(15);

        await db.insert(usuario).values({
            id: userId,
            nombres: nombres1,
            apellidos: apellidos1,
            usuario1,
            contraseña: hashedContraseña,
            rol_id: rolId
        }).run();

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        // Recargar la página actual en lugar de redireccionar
        return new Response(null, { status: 303, headers: { "Location": context.url.pathname } });
    } catch (error) {
        console.error("Error al procesar el formulario:", error);
        return new Response("Error interno del servidor", { status: 500 });
    }
}
