//variables globales

const { MongoClient } = require('mongodb');

const url = "mongodb+srv://spell_26:123@clustersena.mov4yok.mongodb.net/";

//faker
const { faker } = require('@faker-js/faker');

//base de datos y colecciones


const coleccionUno = 'clientes';

const coleccionDos = 'citas';

const coleccionTres = 'estilistas';

//SCHEMA VALIDATOR

//schema cliente

const schemaCliente = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['correo', 'nombre', 'apellido', 'contrasenna', 'estado', 'telefono'],
        properties: {
            correo: {
                bsonType: 'string',
                description: 'Debe ser una cadena de texto'
            },
            nombre: {
                bsonType: 'string',
                description: 'Debe ser una cadena de texto'
            },
            apellido: {
                bsonType: 'string',
                description: 'Debe ser una cadena de texto'
            },
            contrasenna: {
                bsonType: 'string',
                description: 'Debe ser una cadena de texto'
            },
            estado: {
                bsonType: 'boolean',
                description: 'debe ser verdadero o falso'
            },
            telefono: {
                bsonType: 'string',
                description: 'Debe ser una cadena de texto'
            },
            rol: {
                bsonType: 'string',
                description: 'debe ser un string',
                default: 'Cliente'
            }
        }
    }
}

//schema estilista
const schemaEstilista = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['correo', 'nombre', 'apellido', 'contrasenna', 'estado', 'telefono'],
        properties: {
            correo: {
                bsonType: 'string',
                description: 'Debe ser una cadena de texto'
            },
            nombre: {
                bsonType: 'string',
                description: 'Debe ser una cadena de texto'
            },
            apellido: {
                bsonType: 'string',
                description: 'Debe ser una cadena de texto'
            },
            contrasenna: {
                bsonType: 'string',
                description: 'Debe ser una cadena de texto'
            },
            estado: {
                bsonType: 'boolean',
                description: 'debe ser verdadero o falso'
            },
            telefono: {
                bsonType: 'string',
                description: 'Debe ser una cadena de texto'
            },
            rol: {
                bsonType: 'string',
                description: 'debe ser un string',
                default: 'Estilista'
            }
        }
    }
}

//schema cita
const schemaCita = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['fecha', 'hora', 'estado', 'servicio', 'valor', 'duracion', 'cliente', 'estilista'],
        properties: {
            fecha: {
                bsonType: 'int',
                minimum: 2022,
                maximum: 2030,
                description: "la fecha debe ser un integer entre 2022 y 2030"
            },
            hora: {
                bsonType: 'int',
                minimum: 0,
                maximum: 23,
                description: 'debe ser una hora valida',
            },
            estado: {
                bsonType: 'boolean',
                description: 'debe ser verdadero o falso'
            },
            servicio: {
                bsonType: 'string',
                description: 'debe ser un string valido'
            },
            valor: {
                bsonType: 'int',
                description: 'debe ser formato entero'
            },
            duracion: {
                bsonType: 'int',
                minimum: 1,
                maximum: 10,
                description: 'debe ser un entero entre 1 y 10'
            },
            cliente: {
                $ref: '#/definitions/clienteSchema'
            },
            estilista: {
                $ref: '#/definitions/estilistaSchema'
            }
        }
    }
}

//crear base de datos y colleciones

async function crearBaseDeDatos() {
    const client = new MongoClient(url);

    try {
        await client.connect();

        const baseDeDatos = client.db('beautysoft2');

        await baseDeDatos.createCollection(coleccionUno);

        await baseDeDatos.createCollection(coleccionDos);

        await baseDeDatos.createCollection(coleccionTres);

        console.log("creado con exito")
    }
    catch (e) {
        console.log(e);
    }
    finally {
        await client.close();
    }

}

//inyección de datos a las colecciones (2000 registros)

async function insertDataToCollections() {

    const client = new MongoClient(url);

    //bucle 2000 repeticiones
    for (let i = 0; i < 2000; i++) {
        try {
            await client.connect();

            //datos del cliente
            let correoCliente = faker.internet.email();
            let nombreCliente = faker.person.firstName();
            let apellidoCliente = faker.person.lastName();
            let contrasennaCliente = faker.internet.password();
            let estadoCliente = faker.datatype.boolean();
            let telefonoCliente = faker.phone.number();

            //datos del estilista
            let correoEstilista = faker.internet.email();
            let nombreEstilista = faker.person.firstName();
            let apellidoEstilista = faker.person.lastName();
            let contrasennaEstilista = faker.internet.password();
            let estadoEstilista = faker.datatype.boolean();
            let telefonoEstilista = faker.phone.number();

            //datos de la cita
            let fechaCita = faker.number.int({ min: 2022, max: 2030 });
            let horaCita = faker.number.int({ min: 0, max: 23 });
            let estadoCita = faker.datatype.boolean();
            let servicioCita = faker.commerce.productName();
            let valorCita = faker.commerce.price();
            let duracionCita = faker.number.int({ min: 1, max: 10 });


            //objeto datos del estilista
            const estilista = {
                correo: correoEstilista,
                nombre: nombreEstilista,
                apellido: apellidoEstilista,
                contrasenna: contrasennaEstilista,
                estado: estadoEstilista,
                telefono: telefonoEstilista,
            };

            //objeto datos del cliente
            const cliente = {
                correo: correoCliente,
                nombre: nombreCliente,
                apellido: apellidoCliente,
                contrasenna: contrasennaCliente,
                estado: estadoCliente,
                telefono: telefonoCliente,
            };

            //objeto datos de la cita
            const cita = {
                fecha: fechaCita,
                hora: horaCita,
                estado: estadoCita,
                servicio: servicioCita,
                valor: valorCita,
                duracion: duracionCita,
                estilista: estilista,
                cliente: cliente
            }

            const db = client.db('beautysoft2');
            const coleccionCliente = db.collection(coleccionUno);
            const coleccionEstilista = db.collection(coleccionTres);
            const coleccionCita = db.collection(coleccionDos);

            //insertar estilista
            await coleccionCliente.insertOne(cliente);
            //insertar cliente
            await coleccionEstilista.insertOne(estilista);
            //insertar cita
            await coleccionCita.insertOne(cita);

            console.log("registro: "+(i+1)+" ingresado exitosamente");
        }
        catch(e){
            console.log(e);
        }
        finally {
            await client.close();
        }
        
    }


}

//busca todos los registros en la coleccion citas realizados en el año 2023
async function findData(){
    const client = new MongoClient(url);

    try {
        await client.connect();

        const db = client.db('beautysoft2');
        const collect = db.collection('citas');

        //query a usar citas realizadas en el año 2023
        const query = { fecha: 2023 };


        const resultado = collect.find(query);

        if ((await collect.countDocuments(query)) === 0 ){
            console.log("no se encontraron resultados");
        }

        for await (const doc of resultado){
            console.dir(doc)
        }

    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close();
    }
}

//busca Un solo cliente que tenga su estado activo
async function findOneData(){
    const client = new MongoClient(url);

    try {
        await client.connect();

        const db = client.db('beautysoft2');
        const collect = db.collection('clientes');

        //query a usar usuarios activos
        const query = { estado: true };


        const resultado = collect.findOne(query);

        if ((await collect.countDocuments(query)) === 0 ){
            console.log("no se encontraron resultados");
        }

        
        console.dir(resultado);
        

    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close();
    }
}

//eliminar todas las citas del 2022
async function deleteManyData(){
    const client = new MongoClient(url);

    try {
        await client.connect();

        const db = client.db('beautysoft2');
        const collect = db.collection('citas');

        //query a usar citas realizadas en el año 2022
        const query = { fecha: 2022 };


        const resultado = await collect.deleteMany(query);

        console.log("Registros eliminados: ", resultado.deletedCount)

    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close();
    }
}

// agreggate con 3 etapas
async function buscarActivos(){
    const client = new MongoClient(url);

    try{

        await client.connect();

        const base = client.db("beautysoft2");
        const collection = base.collection("citas");

        const consulta = [
            {
                $project: {
                    estilista_activo : "$estilista.estado",
                    estilsita_nombre: "$estilista.nombre"
                }
            },
            {
                $match: { 
                    fecha: 2023,
                    estilista_activo: true
            
                }

            },
            {
                $sort:{
                    estilsita_nombre : -1
                }
            }
        ];

        const resultado =  collection.aggregate(consulta);

        if ((await collection.countDocuments(consulta)) === 0 ){
            console.log("no se encontraron resultados");
        }

        for await (const doc of resultado){
            console.dir(doc)
        }

    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close();
    }
}

//crearBaseDeDatos();
//insertDataToCollections();
//findData();
//findOneData();
//deleteManyData();
//buscarActivos();
