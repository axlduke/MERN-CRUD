const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/crud")

app.get('/', (req,res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
}) 

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//To call when theres need to update a data
//always fetch the params ID in order to update
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id //the ID that always need to be indicate when put(UPDATE)
    //the UserModel where the schema of your data come
    //always indicate the id or the column of ur table in DB
    UserModel.findByIdAndUpdate({_id: id}, {name: req.body.name, email: req.body.email, age: req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findOneAndDelete({ _id : id })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
} )

app.listen(3000, () =>{
    console.log("Server is Running 3000")
})