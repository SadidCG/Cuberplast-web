import {column, defineDb, NOW } from 'astro:db';


export const usuario={
	columns:{
		id: column.number({ primaryKey: true }),
    	nombres: column.text(),
    	apellidos: column.text(),
    	usuario: column.text(),
    	contraseña: column.text(),
   		rol: column.text({ optional: true }),
    	fecha_creacion: column.date({ default: NOW })
	},
}
const seguimientos={
	columns:{
		id: column.number({ primaryKey: true }),
    	nombre_producto: column.text(),
    	nombre_empresa: column.text(),
    	destino: column.text(),
    	direccion: column.text(),
   		localidad: column.text({ optional: true }),
    	fecha: column.date({ default: NOW })
	},
}

export default defineDb({
  tables: { 
    usuario, 
	seguimientos
  },
})

