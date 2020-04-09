const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Load User Model

const UserPassport = require('../models/userPassport')

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match the user
      UserPassport.findOne({ email })
        .then(user => {
          if(!user) {
            return done(null, false, { message: 'Loggin failed try different credentials'})
          }

          // Match the user password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) throw err

            if(isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'Loggin failed try different credentials'})
            }
          })
        })
        .catch(err => console.log(err))
    })
  )

  passport.serializeUser((user, done)=> {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    UserPassport.findById(id, (err, user) => {
      done(err, user)
    })
  })
}