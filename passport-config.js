const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    let user;
    try{
        user=await getUserByEmail(email)
    }catch{
         console.log("error intialize")
    }

    console.log("this is the user:"+user +"and this the password:"+user.id)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
      console.log(password+" this is the passowrd, and this is the user password:"+user.password)
    try {
      if (await bcrypt.compare(password, user.password)) {

            return done(null, user)

      } else {

            return done(null, false, { message: 'Password incorrect' })

      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize
