const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 

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

    // Crear la estructura del json
    const dataToSave = {
        id: uuidv4(), // Genera un UUID para cada alumno
        title: title,
        alumnos: alumnos.map(alumno => ({ nombre: alumno })) // Cada alumno se guarda como un objeto
    };

    // Guardar en el archivo alumnos2024.json
    fs.writeFile(path.join(__dirname, 'data', 'alumnos2024.json'), JSON.stringify(dataToSave, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error al guardar los datos');
        }
        res.send('Datos guardados exitosamente');
    });
});


// Ruta para guardar la información de Lucio Chad
app.post('/luciochad', (req, res) => {
    const { title, description, level, image } = req.body;

    // Verificar que el título comienza con "Lucio Chad"
    if (!title.startsWith("Lucio Chad ")) {
        return res.status(400).send('El título debe comenzar con "Lucio Chad".');
    }

    const lucioChadData = {
        id: uuidv4(), // Asigna un ID único
        title: title,
        description: description,
        level: level,
        image: image
    };

    // Leer el archivo existente o crear uno nuevo
    fs.readFile(path.join(__dirname, 'data', 'luciochad.json'), 'utf-8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error al leer el archivo:', err); // Imprimir el error en la consola
            return res.status(500).send('Error al leer el archivo');
        }

        let lucioChadArray = [];
        if (data) {
            try {
                lucioChadArray = JSON.parse(data); 
                if (!Array.isArray(lucioChadArray)) { 
                    lucioChadArray = [];
                }
            } catch (parseError) {
                console.error('Error al parsear el JSON:', parseError); 
                return res.status(500).send('Error al procesar los datos');
            }
        }

        
        lucioChadArray.push(lucioChadData);

        
        fs.writeFile(path.join(__dirname, 'data', 'luciochad.json'), JSON.stringify(lucioChadArray, null, 2), (err) => {
            if (err) {
                console.error('Error al guardar los datos de Lucio Chad:', err); // Imprimir el error en la consola
                return res.status(500).send(`Error al guardar los datos de Lucio Chad: ${err.message}`);
            }
            res.send('Datos de Lucio Chad guardados exitosamente');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
