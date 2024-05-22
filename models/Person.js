const mongoose = require('mongoose')

const Person = mongoose.model('person', {
    sabor: String,
    marca: String,
})

module.exports = Person