import { db, usuario, Roles, seguimientos, localidades } from 'astro:db';

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


  await db.insert(seguimientos).values([{
    nombre_producto: 'Producto 1',
    nombre_empresa: 'Empresa 1',
    destino: 'Destino 1',
    direccion: 'calle 123 numero 122-21',
    localidad_id: 1
  

  }]);

  await db.insert(localidades).values([{
    id:2,
    nombre_localidad:'suba'

  }]);


};