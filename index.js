import express, { json } from 'express'
import mongoose from 'mongoose'
import * as authValidations from './validations/authValidations.js'
import * as authControllers from './controllers/authControllers.js'
import checkAuth from './utils/checkAuth.js'

const app = express()

app.use(json())

mongoose.connect('mongodb+srv://ibrohim:6d6Ufvgn0zmEHO76@cluster0.ckvdfoz.mongodb.net/kabutaruz').then(() => {
    console.log('normoldaki');
}).catch(() => {
    console.log('plaki plaki');
})

app.post('/auth/register', authValidations.registerValidations, authControllers.register)
app.post('/auth/login', authValidations.loginValidations, authControllers.login)
app.get('/auth/getMe', checkAuth, authControllers.getMe)

app.listen('1111', () => {
    console.log('normaldaki listen');
})