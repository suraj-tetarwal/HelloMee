const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const app = express()

const dbPath = path.join(__dirname, 'sample.db')

let db = null 

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        })
        app.listen(3000, () => {
            console.log(`Server is running at http://localhost:3000/`)
        })
    } catch (e) {
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}

initializeDBAndServer() 

app.get('/', (request, response) => {
    response.send('Hello World')
})