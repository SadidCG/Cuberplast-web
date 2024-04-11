
function registrarEventos() {
    document.getElementById("crear").addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

        var nombre = document.getElementById("name").value;
        var apellido = document.getElementById("lastname").value;
        var usuario1 = document.getElementById("user").value;
        var contraseña = document.getElementById("password").value;
        var rol = document.getElementById("role").value;

        // Validar que todos los campos estén completos
        if (nombre.trim() === '' || apellido.trim() === '' || usuario1.trim() === '' || contraseña.trim() === '' || rol.trim() === '') {
            // Mostrar un mensaje de error o realizar alguna acción
            console.error('Por favor complete todos los campos.');
            return; // Detener la ejecución del código
        }

        let datos = {
            name: nombre,
            lastname: apellido,
            user: usuario1,
            password: contraseña,
            role: rol
        };

        // Insertar datos en la colección de usuarios usando AstroDB
        usuarios.insert(datos)
            .then(() => {
                console.log('Usuario creado exitosamente');
                const myModal = document.getElementById("myModal");
                if (myModal) {
                    myModal.open(); // Abrir el modal después de enviar el formulario
                }
            
            })
            .catch(err => {
                console.error('Hubo un problema al crear el usuario:', err);
            });
    });
}

// Llamar a la función registrarEventos cuando la página se cargue inicialmente
registrarEventos();

// Registrar los eventos nuevamente cada vez que cambie la vista en Astro
export function load() {
    registrarEventos();
}
