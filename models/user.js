const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

// User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  }
})

const User = module.exports = mongoose.model('User', UserSchema)

User.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

User.getUserByUsername = (username, callback) => {
  User.findOne({ username }, callback)
}

User.getUserById = (id, callback) => {
  User.findById(id, callback)
}

User.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err
    callback(null, isMatch)
  })
}