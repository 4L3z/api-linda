 // Script para guardar alumnos
 document.getElementById('alumnoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const alumnosArray = formData.get('alumnos').split(',').map(alumno => alumno.trim());

    const data = {
        nombre: formData.get('nombre'),
        numAlumnos: formData.get('numAlumnos'),
        alumnos: alumnosArray
    };

    fetch('/alumnos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en el servidor: ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        alert('Datos guardados exitosamente');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al guardar los datos: ' + error.message);
    });
});

// Script para guardar transformaciones de Lucio Chad
document.getElementById('lucioChadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        level: formData.get('level'),
        image: formData.get('image')
    };

    fetch('/luciochad', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(err => {
                throw new Error(err);
            });
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        alert('Datos de Lucio Chad guardados exitosamente');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al guardar los datos: ' + error.message);
    });
});
