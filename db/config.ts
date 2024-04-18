
import {column, defineDb, NOW } from 'astro:db';


const usuario={
	columns:{
		id: column.number({ primaryKey: true, unique: true }),
    	nombres: column.text(),
    	apellidos: column.text(),
    	usuario: column.text({unique:true}),
    	contraseña: column.text(),
    	fecha_creacion: column.date({ default: NOW }),
		rol_id: column.number({references:()=>Roles.columns.id, unique: true  })
	}
}

const Roles ={
	columns:{
        id: column.number({ primaryKey: true }),
		rol_label: column.text()
       
    }
}

const seguimientos={
	columns:{
		id: column.number({ primaryKey: true }),
    	nombre_producto: column.text(),
    	nombre_empresa: column.text(),
    	destino: column.text(),
    	direccion: column.text(),
		localidad_id: column.number({references:()=>localidades.columns.id }),
    	fecha: column.date({ default: NOW })
	}
}
const localidades={
	columns:{
        id: column.number({ primaryKey: true }),
        nombre_localidad: column.text()
    }
	
}



export default defineDb({
  tables: { 
    usuario, 
	seguimientos,
	Roles, 
	localidades
  }
})

