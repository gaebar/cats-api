const Cat = require('../models/cat')

// Index handler
function indexRoute(req, res, next) {
  Cat
    .find(req.query)
    .populate('user')
    .then(cats => res.status(200).json(cats))
    .catch(next)
}

// Show handler
function showRoute(req, res, next) {
  Cat
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(cat => {
      if (!cat) {
        res.status(404).json({
          message: 'Cat ' + req.params.id + ' not found'
        })
      } else
        res.status(200).json(cat)
    })
    .catch(next)
}

// Create handler
function createRoute(req, res, next) {
  req.body.user = req.currentUser
  Cat
    .create(req.body)
    .then(cat => res.status(201).json(cat))
    .catch(next)
}

// Edit handler
function editRoute(req, res, next) {
  Cat
    .findById(req.params.id)
    .then(cat => {
      if(!cat) throw new Error('Not Found')
      if (!cat.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
      Object.assign(cat, req.body)
      cat.save()
    })
    .then(cat => res.status(202).json(cat))
    .catch(next)
}

// delete handler
function deleteRoute(req, res, next) {
  Cat
    .findByIdAndRemove(req.params.id)
    .then(cat => {
      if (!cat) {
        res.status(404).json({
          message: 'Cat ' + req.params.id + ' not found'
        })
      } else{
        if (!cat.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
        cat.remove()
      }
    })
    .then(() => res.status(204).json({
      message: 'Cat ' + req.params.id + ' has been deleted'
    }))
    .catch(next)
}

function commentCreateRoute(req, res, next) {
  req.body.user = req.currentUser
  Cat
    .findById(req.params.id)
    .then(cat => {
      if (!cat) throw new Error('Not Found')
      cat.comments.push(req.body)
      cat.save()
    })
    .then(cat => res.status(201).json(cat))
    .catch(next)
}

function commentDeleteRoute(req, res, next) {
  Cat
    .findById(req.params.id)
    .then(cat=> {
      if (!cat) throw new Error('Not Found')
      const comment = cat.comments.id(req.params.commentId)
      if (!comment) throw new Error('Not Found')
      if (!comment.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
      comment.remove()
      cat.save()
    })
    .then(cat => res.status(200).json(cat))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  edit: editRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
}
