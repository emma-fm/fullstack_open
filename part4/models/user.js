const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minLength: 3 },
  password: { type: String, required: true },
  name: { type: String, required: true },
  blogs: { type: [mongoose.Schema.Types.ObjectId], ref: 'Blog' }
})

userSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = document._id.toString()
    delete returnedObj.password
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('User', userSchema)