const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('cookie-session')

const routesIndex = require('./src/routes/')
const routesConjuntos = require('./src/routes/conjuntos')
const app = express()
//view engine setup
app.set('views', path.resolve(__dirname, './src/views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(session({ secret: 'lista' }))
// app.use(session({ secret: 'secreto2' }))
app.use(session({ secret: 'conjuntos' }))




app.use('/todo', routesIndex)
app.use('/conjuntos', routesConjuntos)

app.listen(5555, () => console.log('Server on port 5555'))
