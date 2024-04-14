const express = require('express');
const seedDatabase = require('./dbConfig');
const app = express();
const PORT = 3001;
const multer = require('multer');
 const PDFParser = require('pdf-parse');
 const { MongoClient } = require('mongodb');
 const cors = require('cors'); 

 // Habilita cors
 app.use(cors());

// Middleware para manejar el cuerpo de las solicitudes JSON
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Nombre original del archivo
    }
});
const upload = multer({ storage: storage });

// Endpoint GET para obtener un mensaje
app.get('/ObtenerDocuementos', async (req, res) => {
    const { MongoClient } = require('mongodb');
    const client = new MongoClient('mongodb://localhost:27017');
    
    try {
        await client.connect();
        const database = client.db('sgd-db');
        const collection = database.collection('documentosProveedores');

        const result = await collection.find({}).toArray();
        res.json(result);
    } catch (error) {
        console.error('Error al conectar a la base de datos o al obtener los registros:', error);
        res.status(500).json({ error: 'Error al conectar a la base de datos o al obtener los registros' });
    } finally {
        await client.close();
    }
});

app.post('/GuardarDocumento', upload.single('pdf'), async (req, res) => {
    const { MongoClient } = require('mongodb');

    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const database = client.db('sgd-db');
        const collection = database.collection('documentosProveedores');

        const documento = {
            nombre: req.body.nombre,
            region: req.body.region,
            categoria: req.body.categoria,
            grado: req.body.grado,
            // Otros campos del formulario que desees guardar
            pdf: {
                data: req.file
            }
        };

        await collection.insertOne(documento);

        res.json({ message: 'Documento guardado correctamente' });
    } catch (error) {
        console.error('Error al guardar el documento:', error);
        res.status(500).json({ error: 'Error al guardar el documento' });
    } finally {
        await client.close();
    }
});


// Sembrar la base de datos antes de iniciar el servidor
seedDatabase().then(() => {
    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});
