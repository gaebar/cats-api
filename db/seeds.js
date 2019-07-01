const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const { dbURI } = require('../config/environment')
const Cat = require('../models/cat')
const User = require('../models/user')

mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
        {
          username: 'SyntacticSugarBear',
          email: 'jack@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        }, {
          username: 'Wesleydale',
          email: 'wes@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        }
      ])
    })
    .then(users => {
      console.log(`${users.length} users created`)
      return Cat.create([
        {
          name: 'Felix',
          friendly: true,
          cartoon: 'Felix the Cat',
          year: 1919,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Felix_the_cat.svg/1200px-Felix_the_cat.svg.png',
          rating: 5,
          description: 'Created in the silent film era. This is one cat that does not take life laying down, Felix the Cat is always up for a good laugh.',
          user: users[0]
        }, { name: 'Tom the Cat',
          friendly: true,
          cartoon: 'Tom & Jerry',
          year: 1940,
          image: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Tom_Tom_and_Jerry.png',
          rating: 5,
          description: 'Thomas "Tom" Cat is a fictional character and one of the title characters in Metro-Goldwyn-Mayers series of Tom and Jerry theatrical cartoon short films. Created by William Hanna and Joseph Barbera, Tom is a blue/grey anthropomorphic domestic short-haired cat who first appeared in the 1940 animated short Puss Gets the Boot. Tom was originally known as "Jasper" during his debut in that short, however, beginning from his next appearance in The Midnight Snack and onwards, he is known as "Tom" or "Thomas"',
          user: users[0]
        }, { name: 'Sylvester',
          friendly: true,
          cartoon: 'Sylvester and Tweety',
          year: 1939,
          image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Sylvester_the_Cat.svg/180px-Sylvester_the_Cat.svg.png',
          rating: 5,
          description: 'Sylvester shows a lot of pride in himself and never gives up. Despite (or perhaps because of) his pride and persistence, Sylvester is, with rare exceptions, placed squarely on the "loser" side of the Looney Tunes winner/loser hierarchy.',
          user: users[1]
        }, { name: 'Azrael',
          friendly: false,
          cartoon: 'Smurfs',
          year: 1959,
          image: 'https://vignette.wikia.nocookie.net/smurfs/images/a/a2/Azreal.jpg',
          rating: 3,
          description: 'Azrael is one of the main characters of the Smurfs comic books and the Smurfs cartoon show. ',
          user: users[1]
        }
      ])
    })
    .then(cats => console.log(`${cats.length} cats created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
