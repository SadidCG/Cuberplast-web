

// Define the function eliminarUsuario
export async function eliminarUsuario(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    try {
      await db.delete().from(usuario).where(eq(usuario.id, id));
      console.log(`User with ID ${id} deleted`);

      // Update the user list after deletion
      const updatedUsers = await db
        .select()
        .from(usuario)
        .innerJoin(Roles, eq(usuario.rol_id, Roles.id));

      // Assuming usuarios is a reactive store or state management to re-render
      usuarios.set(updatedUsers);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  }
}
