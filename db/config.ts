
import {column, defineDb, NOW, } from 'astro:db';


const usuario={
	columns:{
		id: column.number({ primaryKey: true, autoIncrement:true }),
    	nombres: column.text(),
    	apellidos: column.text(),
    	usuario: column.text({unique:true}),
    	contraseña: column.text(),
    	fecha_creacion: column.date({ default: NOW }),
		rol_id: column.number({references:()=>Roles.columns.id})
	}
}

const Roles ={
	columns:{
        id: column.number({ primaryKey: true }),
		rol_label: column.text()
       
    }
}
  
const Pedidos = {
    columns: {
        id: column.number({ primaryKey: true }),
        nombre_producto: column.text(),
        cantidad: column.number(),
        destino: column.text(),
        direccion: column.text(),
        localidad_id: column.number({ references: () => localidades.columns.id }),
        fecha: column.date({ default: NOW })
    }
};


const localidades={
	columns:{
        id: column.number({ primaryKey: true }),
        nombre_localidad: column.text()
    }
	
}



export default defineDb({
  tables: { 
  usuario, 
	Pedidos,
	Roles, 
	localidades
  }
})

