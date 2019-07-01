const router = require('express').Router()
const cats = require('../controllers/cats')
const users = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.route('/cats')
  .get(cats.index)
  .post(secureRoute, cats.create)

router.route('/cats/:id')
  .get(cats.show)
  .put(secureRoute, cats.edit)
  .delete(secureRoute, cats.delete)

router.route('/cats/:id/comments')
  .post(secureRoute, cats.commentCreate)

router.route('/cats/:id/comments/:commentId')
  .delete(secureRoute, cats.commentDelete)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/*')
  .all((req,res) => res.status(404).json( {message: 'Not Found'}))

module.exports = router
