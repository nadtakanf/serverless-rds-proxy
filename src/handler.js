let AWS = require('aws-sdk');
// var mysql2 = require('mysql2/promise');
const mysql = require('mysql')
const db = require('./db')

const makeConnection = () => {
    const connection = mysql.createConnection({
        host: process.env.PROXY_ENDPOINT,
        user: process.env.AURORA_USERNAME,
        password: process.env.AURORA_PASSWORD,
        database: process.env.AURORA_DB_NAME,
        port: process.env.AURORA_PORT
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack)
            return
        }

        console.log('connected as id ' + connection.threadId)
    })

    return connection
}

module.exports.handler = async(event) => {
    // const input = JSON.parse(event.body)
    const connection = makeConnection()
    // const seedResult = await db.seed(connection)
    // console.log(seedResult)

    const input = { id: 1, name: 'Nadtakan' }
    const insertedResult = await db.insert(connection, input) 
    console.log(insertedResult)

    const results = await db.getAllUsers(connection)
    console.log(results)

    connection.end()
    // return {
    //     statusCode: 200,
    //     body: connection
    // }
	// console.log(`event: ${JSON.stringify(event)}`);
};