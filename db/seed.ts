import { db, usuario, Roles } from 'astro:db';

export default async function () {

  
  await db.insert(Roles).values([
    {
      id: 12,
      rol_label: 'Administrador',

    },
    {
      id: 13,
      rol_label: 'Usuario',
    }






  ]);
  await db.insert(usuario).values([{
    nombres: 'Juanito',
    apellidos: 'Pérez',
    usuario: 'juanito',
    contraseña: '<PASSWORD>',
    rol_id: 12
  },
  {
    nombres: 'María',
    apellidos: 'Gómez',
    usuario: 'maria',
    contraseña: 'password',
    rol_id: 13
  }


  ]);


};