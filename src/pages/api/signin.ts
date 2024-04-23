import { lucia } from "@/auth";
import type { APIContext } from "astro";
import { db, eq, usuario } from "astro:db";
import { Argon2id } from "oslo/password";
export async function POST(context: APIContext): Promise<Response> {
  //read the form data
  const formData = await context.request.formData();
  const username = formData.get("usuario1");
  const password = formData.get("contraseña1");
  //validate the data
  if (typeof username !== "string") {
    return new Response("Invalid username", {
      status: 400,
    });
  }
  if (typeof password !== "string") {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  //search the user
  const foundUser = (
    await db.select().from(usuario).where(eq(usuario.user, username))
  ).at(0);

  //if user not found
  if (!foundUser) {
    return new Response("Incorrect username or password", { status: 400 });
  }

  // verify if user has password
  if (!foundUser.contraseña) {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  const validPassword = await new Argon2id().verify(
    foundUser.contraseña,
    password
  );

  //If password is not valid
  if (!validPassword) {
    return new Response("Incorrect username or password", { status: 400 });
  }

  //Password is valid, user can log in

  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
   
  );
  return context.redirect("./inicioAdmin.astro");
}