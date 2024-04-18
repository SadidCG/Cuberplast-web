
import {column, defineDb, NOW } from 'astro:db';


const usuario={
	columns:{
		id: column.number({ primaryKey: true }),
    	nombres: column.text(),
    	apellidos: column.text(),
    	usuario: column.text({unique:true}),
    	contraseña: column.text(),
    	fecha_creacion: column.date({ default: NOW }),
		rol_id: column.number({references:()=>Roles.columns.id, nique: true  })
	}
}

const Roles ={
	columns:{
        id: column.number({ primaryKey: true }),
		rol_label: column.text({ unique: true })
       
    }
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
	}
}



export default defineDb({
  tables: { 
    usuario, 
	seguimientos,
	Roles
  }
})

