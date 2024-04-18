const express = require('express');
const bodyParser = require('body-parser');
const { AstroDBClient } = require('astrodb');

const app = express();
const port = 4321;

// Configurar la conexión a la base de datos
const client = new AstroDBClient({
    user: 'SadidCG',
    password: '2004Lesley', // Asegúrate de proporcionar la contraseña correcta
    host: 'astrodb-url.com', // Reemplaza con la URL correcta de AstroDB
    port: 5432, // Puerto predeterminado de PostgreSQL para AstroDB
    database: 'cuberplas-web',
});

// Conectar con la base de datos
client.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para manejar la solicitud POST del formulario
app.post('/api/apiUsuario', async (req, res) => {
    const { name, lastname, user, password, role } = req.body;

    try {
        // Insertar los datos en la base de datos
        const query = `
            INSERT INTO usuarios (nombre, apellidos, usuario, contraseña, rol)
            VALUES ($1, $2, $3, $4, $5)
        `;
        await client.query(query, [name, lastname, user, password, role]);

        // Enviar una respuesta de éxito al cliente
        res.status(200).json({ message: 'Datos del usuario guardados correctamente' });
    } catch (error) {
        // Manejar los errores
        console.error('Error al guardar los datos:', error);
        res.status(500).json({ error: 'Se produjo un error al guardar los datos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
