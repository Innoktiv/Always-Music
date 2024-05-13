const { Client } = require('pg');

async function registrarEstudiante(nombre, rut, curso, nivel) {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'always_music',
        password: 'password',
        port: 5432
});

    try {
        await client.connect();
        const query = `INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)`;
        const values = [nombre, rut, curso, nivel];
        await client.query(query, values);
        console.log(`Estudiante ${nombre} registrado exitosamente!`);
    } catch (error) {
        console.error(`Error al registrar estudiante: ${error.message}`);
    } finally {
        await client.end();
    }
}


async function obtenerEstudiantePorRut(rut) {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'always_music',
        password: 'password',
        port: 5432
    });

    try {
        await client.connect();
        const query = `SELECT * FROM estudiantes WHERE rut = $1`;
        const values = [rut];
        const result = await client.query(query, values);
        
        if (result.rows.length === 0) {
        console.log(`Estudiante con rut ${rut} no encontrado.`);
        } else {
            const estudiante = result.rows[0];

            console.log(`Estudiante encontrado:`);
            console.log(`Nombre: ${estudiante.nombre}`);
            console.log(`Rut: ${estudiante.rut}`);
            console.log(`Curso: ${estudiante.curso}`);
            console.log(`Nivel: ${estudiante.nivel}`);
        }
    
    } catch (error) {
        console.error(`Error al obtener estudiante: ${error.message}`);
    } finally {
        await client.end();
    }
}


async function obtenerTodosEstudiantes() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'always_music',
        password: 'password',
        port: 5432
    });

    try {
        await client.connect();
        const query = 'SELECT * FROM estudiantes';
        const result = await client.query(query);
        if (result.rows.length === 0) {
            console.log(`No hay estudiantes registrados.`);
        } else {
            console.log(`Lista de estudiantes:`);
        
            for (const estudiante of result.rows) {
                console.log(`Nombre: ${estudiante.nombre}`);
                console.log(`Rut: ${estudiante.rut}`);
                console.log(`Curso: ${estudiante.curso}`);
                console.log(`Nivel: ${estudiante.nivel}`);
                console.log('--------------------');
            }
        }
    } catch (error) {
        console.error(`Error al obtener estudiantes: ${error.message}`);
    } finally {
        await client.end();
    }
}


async function actualizarEstudiante(rut, nuevoNombre, nuevoCurso, nuevoNivel) {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'always_music',
        password: 'password',
        port: 5432
    });

    try {
        await client.connect();
        const query = `UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4`;
        const values = [nuevoNombre, nuevoCurso, nuevoNivel, rut];
        await client.query(query, values);
        console.log(`Estudiante con rut ${rut} actualizado exitosamente!`);
    } catch (error) {
        console.error(`Error al actualizar estudiante: ${error.message}`);
    } finally {
        await client.end();
    }
}