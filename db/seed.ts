import { db, usuario, Roles, Pedidos, localidades } from 'astro:db';

export default async function () {

  
  await db.insert(Roles).values([
    {
      id: 1,
      rol_label: 'Administrador'

    },
    {
      id: 2,
      rol_label: 'Usuario' 
    }






  ]);
  await db.insert(usuario).values([{
    nombres: 'Juanito',
    apellidos: 'Pérez',
    user: 'juanito',
    contraseña: '<PASSWORD>',
    rol_id: 2
  },
  {
    nombres: 'María',
    apellidos: 'Gómez',
    user: 'maria',
    contraseña: 'password',
    rol_id: 2
  },
  {
    nombres: 'Lesley Sadid',
    apellidos: 'Camargo Gutierrez',
    user: 'Lesley1',
    contraseña: 'camargo19',
    rol_id: 1
  },
  {
    nombres: 'Maríaadad',
    apellidos: 'Gómez',
    user: 'maria123',
    contraseña: 'password',
    rol_id: 2
  }



  ]);

  await db.insert(localidades).values([{
    id:1,
    nombre_localidad:'Antonio Nariño'

  },
  {
    id:2,
    nombre_localidad:'Barrios Unidos'
  },
  {
    id:3,
    nombre_localidad:'Bosa'
  },
  {
    id:4,
    nombre_localidad:'Chapinero'
  },
  {
    id:5,
    nombre_localidad:'Ciudad Bolívar'
  },
  {
    id:6,
    nombre_localidad:'Engativá'
  },
  {
    id:7,
    nombre_localidad:'Fontibón'
  },
  {
    id:8,
    nombre_localidad:'Kennedy'
  },

  {
    id:9,
    nombre_localidad:'La Candelaria'
  },
  {
    id:10,
    nombre_localidad:'Los Mártires'
  },
  {
    id:11,
    nombre_localidad:'Puente Aranda'
  },
  {
    id:12,
    nombre_localidad:'Rafael Uribe Uribe'
  },
  {
    id:13,
    nombre_localidad:'San Cristobal'
  },
  {
    id:14,
    nombre_localidad:'Santa Fe'
  },
  {
    id:15,
    nombre_localidad:'Suba'
  },
  {
    id:16,
    nombre_localidad:'Sumapaz'
  },
  {
    id:17,
    nombre_localidad:'Teusaquillo'
  },
  {
    id:18,
    nombre_localidad:'Tunjuelito'
  },
  {
    id:19,
    nombre_localidad:'Usaquén'
  },
  {
    id:20,
    nombre_localidad:'Usme'
  }

]);
  await db.insert(Pedidos).values([{
    nombre_producto: 'Producto1',
    cantidad:2,
    destino: 'Destino 1',
    direccion: 'calle 123 numero 122-21',
    localidad_id: 1,
   
  

  },
  {
    nombre_producto: 'Producto2',
    cantidad:43,
    destino: 'aaaa',
    direccion: 'calle 123 numero 122-21',
    localidad_id: 19,
   
  

  },
  {
    nombre_producto: 'Producto2',
    cantidad:43,
    destino: 'aaaa',
    direccion: 'calle 123 numero 122-21',
    localidad_id: 9,
   
  

  }]);

  


};