
// const mongoose = require('mongoose');
var srv = require('../model/Survivor');
var vir = require('../model/Virus');


//
const getStatus=async()=>
{
    try{
          let srv_amount=await srv.find()
          let srv_infected=await srv.find({isInfected:"True"})
          let precent_infect=(srv_infected.length/srv_amount.length)*100
          let healthy=100-precent_infect
          let avg=average(srv_amount.length,srv_amount)
          let smpo=sumpoint(srv_infected)
        return {Survivers:srv_amount.length,infected:precent_infect,notInfected:healthy,average:avg,pointLoss:smpo}
    }catch(err)
    {
      return err
    }


}
const average=(power,users)=>
{
  let water=0;
  let food=0;
  let medication=0;
  let ammunition=0;
  users.map(user=>{
       if(user.inventory.water.amount)
       {
         water=water+(user.inventory.water.amount*(1/power))
       }
       if(user.inventory.food.amount)
       {
         food=food+(user.inventory.food.amount*(1/power))
       }
       if(user.inventory.medication.amount)
       {
         medication=medication+(user.inventory.medication.amount*(1/power))
       }
       if(user.inventory.ammunition.amount)
       {
         ammunition=ammunition+(user.inventory.ammunition.amount*(1/power))
       }
  })
  return {water:water,food:food,medication:medication,ammunition:ammunition}
}
const sumpoint=(users)=>
{
  let sum=0;
  users.map(user=>{
       if(user.inventory.water.amount)
       {
         sum=sum+user.inventory.water.amount*4
       }
       if(user.inventory.food.amount)
       {
        sum=sum+user.inventory.food.amount*3
       }
       if(user.inventory.medication.amount)
       {
         sum=sum+user.inventory.medication.amount*2
       }
       if(user.inventory.ammunition.amount)
       {
         sum=sum+user.inventory.ammunition.amount*1
       }
  })
  return sum
}

// ---------------------------------------------------------------------------


////-------------------------------------------

//----------------------------
exports.getStatus=getStatus;



//-----------------------------
