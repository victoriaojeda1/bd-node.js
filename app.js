/*import express from 'express';
import {pool} from './config/db.js';

const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// definir rutas CRUD

app.get('/users', async (req, res) => {
    
    try {
        const connection = await pool.getConnection ();
        const [rows, fields] = await connection.query ('SELECT * FROM usuario');
        console.log (fields)
        connection.release ();
        res.json (rows);
    } catch (err) {
        console.error ('HUBO UN ERROR AL CONSULTAR LA BASE DE DATOS:, err');
        res.status (500).send ('HUBO UN ERROR AL CONSULTAR LA BASE DE DATOS');
    }
});

//app.get'/users/:id', (req, res) => {
    // Código para manejar la solicitud GET por ID
    app.get('/users/:id', async (req, res) => {   
    try {
        //const connection = await pool.getConnection ();
        const id = req.params.id;
        const sql = ('SELECT * FROM usuario WHERE id = ?');
        const [rows, fields] = await connection.query (sql, [{id}]);
        console.log (fields)
        connection.release ();
        if (rows.length === 0) {
            res.status (404).send ('USUARIO NO ENCONTRADO');
        } else {
            res.json (rows [0]);
        }   
    } catch (err) {
        console.error ('HUBO UN ERROR AL CONSULTAR LA BASE DE DATOS:, err');
        res.status (500).send ('HUBO UN ERROR AL CONSULTAR LA BASE DE DATOS');
    }
});

app.post('/users', async (req, res) => {
    try {
    // Crear un nuevo usuario

   
            const connection = await pool.getConnection();
    
            const userData = req.body; // toma la info del formulario
      
            const sql = 'INSERT INTO usuarios SET ?'; // (nombre, email, password, rol) VALUES (?, ?, ?, ?)';
            const [rows] = await connection.query(sql, [userData]);;
            connection.release();
            res.json({mensaje: 'Usuario creado', id: rows.insertId});

           // res.redirect('/users.html' + "?mensaje=Usuario creado");
        } catch (err) {
            console.error('Hubo un error al consultar la base de datos:', err);
            res.status(500).send('Hubo un error al consultar la base de datos');
        }
        
    const newUser = req.body;
   
    connection.query (sql, newUser, (err, result) => {
        if (err) {
            console.error('HUBO UN ERROR AL CREAR EL USUARIO:');
            res.status (500).send('HUBO UN ERROR AL CREAR EL USUARIO:');
        } else {
            res.status(201).send('USUARIO CREADO CORRECTAMENTE');

        }
    })
});

app.get('/users', (req, res) => {
    // Código para manejar la solicitud GET
});

app.get('/users/:id', (req, res) => {
    // Código para manejar la solicitud GET por ID
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
*/
import express from 'express';

import {pool} from './config/db.js';


const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define routes here
app.get('/users', async (req, res) => {
    
    try {
        const connection = await pool.getConnection();
        const sql = 'SELECT * FROM usuario'
        const [rows, fields] = await connection.query(sql);
        // console.log("FIELDS -->", fields)
        connection.release();
        res.json(rows);
    } catch (err) {
        console.error('Hubo un error al consultar la base de datos:', err);
        res.status(500).send('Hubo un error al consultar la base de datos');
    }
});


    app.get('/users/:id_usuario', async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const id = req.params.id
            const sql = 'SELECT * FROM usuario WHERE id_usuario = ?';

            const [rows, fields] = await connection.query(sql, [id]);
            connection.release();
            if (rows.length === 0) {
                res.status(404).send('User not found');
            } else {
                res.json(rows[0]);
            }
        } catch (err) {
            console.error('Hubo un error al consultar la base de datos:', err);
            res.status(500).send('Hubo un error al consultar la base de datos');
        }
    });


app.post('/users', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const {nombre, apellido, email, password, rol} = req.body;

        const userData = req.body; // toma la info del formulario
  
        const sql = 'INSERT INTO usuario SET ?'; // (nombre, email, password, rol) VALUES (?, ?, ?, ?)';
        const [rows] = await connection.query(sql, [userData]);;
        connection.release();
        res.json({mensaje: 'Usuario creado', id: rows.insertId});
       // res.redirect('/users.html' + "?mensaje=Usuario creado");
    } catch (err) {
        console.error('Hubo un error al consultar la base de datos:', err);
        res.status(500).send('Hubo un error al consultar la base de datos');
    }
    
});

app.get('/', (req, res) => {
    // Get all users
});




    app.post('/users/:id', async (req, res) => {
        try {
            const connection = await pool.getConnection();
            const id = req.params.id;
            const userData = req.body; // toma la info del formulario

            const sql = 'UPDATE usuario SET ? WHERE id = ?';
            const [rows] = await connection.query(sql, [userData, id]);
            connection.release();
            res.json({ mensaje: 'Usuario actualizado' });
        } catch (err) {
            console.error('Hubo un error al consultar la base de datos:', err);
            res.status(500).send('Hubo un error al consultar la base de datos');
        }
    });


app.get('/users/borrar/:id', async (req, res) => {
    
        try {
            const connection = await pool.getConnection();
            const id = req.params.id;
            const sql = 'DELETE FROM usuario WHERE id = ?';
            const [rows] = await connection.query(sql, [id]);
            connection.release();
            if (rows.affectedRows === 0) {
                res.status(404).send('User not found');
            } else {
                res.json({ mensaje: 'Usuario eliminado' });
            }
        } catch (err) {
            console.error('Hubo un error al consultar la base de datos:', err);
            res.status(500).send('Hubo un error al consultar la base de datos');
        }
 
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});