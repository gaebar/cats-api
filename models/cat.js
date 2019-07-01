const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true }
}, {
  timestramps: true
})

const catSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  friendly: { type: Boolean },
  cartoon: { type: String, required: true },
  year: { type: Number },
  image: { type: String },
  rating: {type: Number, min: 1, max: 5, maxlength: 5000 },
  description: { type: String },
  comments: [ commentSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

catSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Cat', catSchema)
