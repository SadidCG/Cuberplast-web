
import {column, defineDb, NOW, } from 'astro:db';
import { defineTable } from 'astro:db';


const usuario= defineTable({
	columns:{
		id: column.text({ primaryKey: true, unique:true }),
    	nombres: column.text(),
    	apellidos: column.text(),
      user: column.text({unique:true}),
    	
    	contraseña: column.text(),
    	fecha_creacion: column.date({ default: NOW }),
		rol_id: column.number({references:()=>Roles.columns.id})
	}
});

const Roles = defineTable({
	columns:{
    id: column.number({ primaryKey: true }),
		rol_label: column.text()
       
    }
})
const Sesiones = defineTable({
  columns:{
    id:column.text({optional: false, unique:true}),
    userId:column.text({optional: false, references:() => usuario.columns.id}),
    expiresAt:column.text({optional:false})

  }
});
  
const Pedidos = defineTable ({
    columns: {
        id: column.text({ primaryKey: true }),
        nombre_producto: column.text(),
        cantidad: column.number(),
        destino: column.text(),
        direccion: column.text(),
        localidad_id: column.number({ references: () => localidades.columns.id }),
<<<<<<< HEAD
        fecha: column.date({ optional: true, default:NOW})
=======
        fecha: column.date({ optional: true})
>>>>>>> 13281546d65ff49a7431fe60388de9c0de3ae225
    }
});


const localidades= defineTable({
	columns:{
        id: column.number({ primaryKey: true }),
        nombre_localidad: column.text()
    }
	
})



export default defineDb({
  tables: { 
  usuario, 
	Pedidos,
	Roles, 
	localidades,
  Sesiones
  }
})

