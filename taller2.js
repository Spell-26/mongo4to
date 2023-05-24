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

//crearBaseDeDatos();
insertDataToCollections();
