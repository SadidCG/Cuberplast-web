import type { APIContext } from "astro";
import { db, eq, usuario, Roles } from "astro:db"; // Asegúrate de importar la tabla de Roles
import { Argon2id } from "oslo/password";
import { lucia } from "@/auth";

async function generateResponse(message: string, statusCode: number = 200): Promise<Response> {
    const backButton = `<button onclick="window.history.back();">Regresar</button>`;
    const responseText = `${message}<br>${backButton}`;
    return new Response(responseText, { status: statusCode, headers: { "Content-Type": "text/html" } });
}

export async function POST(context: APIContext): Promise<Response> {
    try {
        // Leer los datos del formulario
        const formData = await context.request.formData();
        const username = formData.get("usuario");
        const password = formData.get("contraseña");

        // Validar los datos
        if (typeof username !== "string" || typeof password !== "string") {
            return await generateResponse("Credenciales inválidas", 400);
        }

        // Buscar al usuario
        const foundUsers = await db.select().from(usuario).where(eq(usuario.user, username));

        // Verificar si se encontró al menos un usuario
        if (foundUsers.length === 0) {
            return await generateResponse("El usuario ingresado no existe", 400);
        }

        // Tomar el primer usuario encontrado
        const foundUser = foundUsers[0];

        // Verificar si el usuario tiene una contraseña establecida
        if (!foundUser.contraseña) {
            return await generateResponse("La contraseña no ha sido establecida", 400);
        }

        // Verificar si la contraseña es válida
        const validPassword = await new Argon2id().verify(foundUser.contraseña, password);

        if (!validPassword) {
            return await generateResponse("Contraseña incorrecta", 400);
        }

        // La contraseña es válida, el usuario puede iniciar sesión

        // Obtener el rol del usuario
        const userRole = await db.select().from(Roles).where(eq(Roles.id, foundUser.rol_id));

        // Verificar el rol y redirigir en consecuencia
        if (!userRole) {
            return await generateResponse("Rol de usuario no encontrado", 400);
        }

        // Extraer el id de rol
        const roleId = userRole[0].id;

        // Crear una cookie de sesión para almacenar el id de usuario y el rol
        const session = await lucia.createSession(foundUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        // Redirigir según el id de rol
        let redirectUrl = "";
        if (roleId === 1) {
            redirectUrl = "/inicioAdmin";

        } else if (roleId === 2) {
            redirectUrl = "/inicioUsuario";

        } else {
            return await generateResponse("Rol no reconocido", 400);
        }

        // Reemplazar la URL actual en el historial del navegador
        const redirectResponse = new Response(null, { status: 303, headers: { "Location": redirectUrl } });
        redirectResponse.headers.set("Refresh", `0; url=${redirectUrl}`);
        return redirectResponse;

    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        return await generateResponse("Error interno del servidor", 500);
    }
}
