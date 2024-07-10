const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstackopencluster.jl1b9aq.mongodb.net/?retryWrites=true&w=majority&appName=FullstackOpenCluster`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
    const name = process.argv[3]
    const number = process.argv[4]
    
    const pers = new Person({
        name: name,
        number: number
    })
    
    pers.save().then(result => {
        console.log('Person saved')
        mongoose.connection.close()
    })
}
else {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(pers => {
            console.log(`${pers.name} ${pers.number}`)
        })
        mongoose.connection.close()
    })
}


