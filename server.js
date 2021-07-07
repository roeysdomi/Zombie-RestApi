if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose');
 const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const db = require('./config/key').mongoURI;
const initializePassport = require('./passport-config')
const survivorapi=require('./routes/survivorRoutes')

///============================

initializePassport(
  passport,
  async email =>{
    const usr= await monfunc.getuser(email)
    if (usr){
       console.log("found user: "+usr) ;
       return usr
     }
  } ,
async id =>
  {
    const usr=await monfunc.getuserbyId(id)
    if (usr) {
      return usr
     }
  }
)



app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
///=========================================================


// --------------connect to mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => {console.log('MongoDB Connected')})
  .catch(err => console.log(err));
  mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
///========================================
app.use(survivorapi)

// app.use(notFound)
// app.use(errorHandlerMiddleware)

app.listen(3000)
