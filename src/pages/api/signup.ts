import type { APIContext } from "astro";
import { Argon2id } from "oslo/password";
import { db, usuario, Roles } from "astro:db"; // Importa también la tabla Roles
import { generateId } from "lucia";
import { lucia } from "@/auth";


export async function POST(context: APIContext): Promise<Response> {
    const formData = await context.request.formData();
    const nombres1 = formData.get("nombres1");
    const apellidos1 = formData.get("apellidos1");
    const usuario1 = formData.get("usuarioform");
    const contraseña1 = formData.get("contraseña1");
    const rolId = formData.get("rol1");

    // Validaciones
    if (!usuario1 || !contraseña1 || !nombres1 || !apellidos1 || !rolId) {
        return new Response("Debe llenar todos los campos", { status: 400 });
    }

    if (typeof nombres1 !== "string" || nombres1.length < 2) {
        return new Response("El nombre debe tener al menos dos caracteres", { status: 400 });
    }

    if (typeof apellidos1 !== "string" || apellidos1.length < 2) {
        return new Response("Los apellidos deben tener al menos dos caracteres", { status: 400 });
    }

    if (typeof usuario1 !== "string" || usuario1.length < 4) {
        return new Response("El usuario debe tener al menos cuatro caracteres", { status: 400 });
    }

    if (typeof contraseña1 !== "string" || contraseña1.length < 6) {
        return new Response("La contraseña debe tener al menos seis caracteres", { status: 400 });
    }

    const rol = await db.select().from(usuario).where({rol_id: rolId, eq }).run(); // Buscar el rol por ID
    if (!rol || rol.length === 0) {
        return new Response("El rol seleccionado no es válido", { status: 400 });
    }

    // Hash de la contraseña
    const hashedContraseña = await new Argon2id().hash(contraseña1);

    // Generar ID de usuario
    const userId = generateId(15);

    // Insertar en la base de datos
    await db.insert(usuario).values({
        nombres: nombres1,
        apellidos: apellidos1,
        user: usuario1,
        contraseña: hashedContraseña,
        rol_id: Number(rolId)
    }).run();

    // Crear sesión
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value);

    // Redireccionar a la página de usuarios
    return context.redirect("/usuarios.astro");
}
