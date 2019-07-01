const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

// register handler
function register(req, res, next) {
  User
    .create(req.body)
    .then(user => res.status(201).json({
      message: `Thanks for registering ${user.username}`
    }))
    .catch(next)
}

// login handler
function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        throw new Error('Unauthorized')
      }
      const token = jwt.sign({ sub: user._id}, secret, { expiresIn: '6h' })
      res.status(200).json({
        message: `Welcome back ${user.username}`,
        token
      })
    })
    .catch(next)
}

module.exports = {
  register,
  login
}
