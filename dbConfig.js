const { MongoClient } = require('mongodb');

async function seedDatabase() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const database = client.db('sgd-db');
        await database.createCollection('documentosProveedores');

        console.log('Colección "documentosProveedores" creada correctamente');
    } catch (error) {
        console.error('Error al crear la colección:', error);
    } finally {
        await client.close();
    }
}

module.exports = seedDatabase;
