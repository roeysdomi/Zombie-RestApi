const express = require('express')
const router = express.Router()
// const initializePassport = require('../passport-config')
// const userapi=require('../routes/userRoutes')
const passport = require('passport')
const mongoose = require('mongoose');
const monfunc=require('../mongo/monfunction_survivor')
const monfunc_virus=require('../mongo/monfunction_virus')
const monfunc_status=require('../mongo/monfunction_status')


///--------------------------------------------------------

// add survivor request the main function located in mongo->survivor

router.post('/addsurvivor', async (req, res) => {
  try {
    console.log(req.body)
    let surviv={
      name:req.body.name,
      age:req.body.age,
      last_location:JSON.parse(req.body.last_location),
      isInfected:JSON.parse(req.body.isInfected),
      inventory:JSON.parse(req.body.inventory)
    }
    console.log(surviv)
  const result= await  monfunc.addSurvivor(surviv)
   await  res.status(200).json(result)
  } catch(err) {
    console.log("errorrr:"+err)
    await  res.status(400).json(err)
  }

})

// update location request the main function located in mongo->survivor
router.post('/updateloc', async (req, res) => {
  try {
    console.log(req.body)
    let name=req.body.name
    let loc=JSON.parse(req.body.last_location)


  const result= await  monfunc.updateloc(name,loc)
   await  res.status(200).json(result)
  } catch(err) {
    console.log("errorrr:"+err)
    await  res.status(400).json(err)
  }

})

// trade request the main function located in mongo->survivor
router.post('/trade', async (req, res) => {
  try {

    const survivor1=JSON.parse(req.body.surviver1)
    const survivor2=JSON.parse(req.body.surviver2)

  const surv1={
    name:survivor1.name,
    trade:survivor1.trade
  }
  const surv2={
    name:survivor2.name,
    trade:survivor2.trade
  }
  const result= await  monfunc.survivorTrade(surv1,surv2)
   await  res.status(200).json(result)
  } catch(err) {
    console.log("errorrr:"+err)
    await  res.status(400).json(err)
  }

})

//  report request  the main function located in mongo->virus
router.post('/addreport', async (req, res) => {
  try {

    const name=req.body.name

    const result= await  monfunc_virus.addreport(name)
     await  res.status(200).json(result)

  } catch(err) {
    console.log("errorrr:"+err)
    await  res.status(400).json(err)
  }

})

// status request the main function located in mongo->status
router.get('/', async (req, res) => {
  try {

    // const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const result= await  monfunc_status.getStatus()
     await  res.status(200).json(result)

  } catch(err) {
    console.log("errorrr:"+err)
    await  res.status(400).json(err)
  }

})




module.exports=router;
