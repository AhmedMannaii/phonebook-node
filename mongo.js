const mongoose = require ('mongoose')

if (process.argv.length<3) {
console.log('give password as argument')
process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.k17ocws.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
name: String,
number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose.connect(url).then(result => {
console.log('connected to MongoDB')
if (process.argv.length === 3) {
Person.find({}).then(result => {
console.log('phonebook:')
result.forEach(person => {
console.log(person)
})
mongoose.connection.close()
})
} else if (process.argv.length === 5) {
const person = new Person({
name: process.argv[3],
number: process.argv[4],
})
person.save().then(result => {

console.log('added ' + person.name + ' number ' + person.number + ' to phonebook')
mongoose.connection.close()
})
} else {
console.log('give name and number as arguments')

mongoose.connection.close()
}
})

