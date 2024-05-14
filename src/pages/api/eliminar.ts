import { db, usuario, eq } from "astro:db";


await db.delete(usuario).where(eq(usuario.nombres, usuario.apellidos));