import { db, usuario, eq } from "astro:db";


await db.update(usuario)
  .set({ nombres: 'Mr. Dan', apellidos:  'John', user:'', contraseña: '', rol_id:1 })
  .where(eq(usuario.nombres, 'Dan'));