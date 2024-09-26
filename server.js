const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para guardar los alumnos
app.post('/alumnos', (req, res) => {
    const { nombre, numAlumnos, alumnos } = req.body;


    const numAlumnosInt = parseInt(numAlumnos);

    // Validar número de alumnos
    if (numAlumnosInt <= 0) {
        return res.status(400).send('Error: Debe haber al menos un alumno.');
    }


    let title;
    if (numAlumnosInt === 1) {
        title = `Según ${nombre}, El único alumno activo en la clase es`;
    } else {
        title = `Según ${nombre}, Los ${numAlumnosInt} alumnos más activos en la clase son`;
    }

    const dataToSave = {
        title: title,
        alumnos: alumnos 
    };

    // Guardar en el archivo alumnos2024.json
    fs.writeFile(path.join(__dirname, 'data', 'alumnos2024.json'), JSON.stringify(dataToSave, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error al guardar los datos');
        }
        res.send('Datos guardados exitosamente');
    });
});

// Ruta para obtener alumnos
app.get('/alumnos', (req, res) => {
    res.json(alumnos);
});

// Ruta para guardar la información de Lucio Chad
app.post('/luciochad', (req, res) => {
    const { title, description, level, image } = req.body;

    // Verificar que el título comienza con "Lucio Chad"
    if (!title.startsWith("Lucio Chad ")) {
        return res.status(400).send('El título debe comenzar con "Lucio Chad".');
    }

    const lucioChadData = {
        title: title,
        description: description,
        level: level,
        image: image
    };

    // Guardar en el archivo luciochad.json
    fs.writeFile(path.join(__dirname, 'data', 'luciochad.json'), JSON.stringify(lucioChadData, null, 2), (err) => {
        if (err) {
            return res.status(500).send(`Error al guardar los datos de Lucio Chad: ${err.message}`);
        }
        res.send('Datos de Lucio Chad guardados exitosamente');
    });
});




app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
