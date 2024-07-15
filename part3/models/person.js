const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Connecting to ', url)

mongoose.connect(url)
    .then(result => {
        console.log('Connected sucessfully to MongoDB')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB: ', error)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: (v) => {
                console.log(v.split("-"))
                return (v.split("-").length == 2) && (/\b\d{2,3}-\d{1,}\b/.test(v))
            },
            message: props => `${props.value} is not a valid phone number.`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)

const Person = mongoose.model('Person', personSchema)