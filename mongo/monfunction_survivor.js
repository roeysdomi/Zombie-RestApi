
// const mongoose = require('mongoose');
var srv = require('../model/Survivor');

const bcrypt = require('bcrypt')

// -------------------enterfunctions-------------------------
//
const addSurvivor=async(thesurvivor)=>
{
      const {name,age,last_location,isInfected,inventory}=thesurvivor
    var add=new srv ({
      name:name,
      age:age,
      last_location:last_location,
      isInfected:isInfected,
      inventory:inventory
    })

  return await add.save()
}

const updateloc=async(name,loc)=>
{

   try{
  return await user.findOneAndUpdate({name:name},
    {
      $set:
      {
        last_location:loc
      }
    },
    {new:true});
  }catch
  {
    return "didnt update the survivor location"
  }
}
const updateInventory=(srviv)=>
{

    console.log(srviv)
  return  srv.findOneAndUpdate({name:srviv.name},
    {
      $set:
      {
        inventory:srviv.inventory
      }
    },
    {new:true});
}
// --------------------updatesfunctions----------------------

const survivorTrade=async(srv1,srv2)=>
{
  let survivor1=await getsrv(srv1.name)
  const trade1=await srv1.trade

  let sum1=0;
  if(checkIfExsit(survivor1,trade1))
  {
     sum1=sumTrade(trade1)
  }
  else{return "survivor1 dosent have the actuall inventory"}

  let survivor2=await getsrv(srv2.name)
  const trade2=srv2.trade
  let sum2=0;
  if(checkIfExsit(survivor2,trade2))
  {
     sum2=sumTrade(trade2)
  } else{return "survivor2 dosent have the actuall inventory"}

  if(sum1==sum2)
  {
    survivor1=removeTrade(survivor1,trade1)
    survivor2=removeTrade(survivor2,trade2)
    ///---now switching the trade
    survivor1=addTrade(survivor1,trade2)
    survivor2=addTrade(survivor2,trade1)
    ///---------------------
    try{
      await   updateInventory(survivor1)
      await   updateInventory(survivor2)
      return true
    }catch
    {
      console.log("didnt update survivor db error")
      return false
    }

  }
   return "the sums of both survivors do not match"

}
const checkIfExsit=(srviv,trade)=>
{


    if(trade.water)
    {
      if(trade.water.amount>srviv.inventory.water.amount){return false}
    }
    console.log(1)
    if(trade.food)
    {
      if(trade.food.amount>srviv.inventory.food.amount){return false}
    }
    console.log(2)
    if(trade.medication)
    {
      console.log("-------------------------------------")
      console.log(trade.medication.amount)
      console.log(srviv.inventory.medication.amount)
      console.log(srviv.inventory.medication.amount)

      if(trade.medication.amount>srviv.inventory.medication.amount){return false}
    }
    console.log(3)
    if(trade.ammunition)
    {
      if(trade.ammunition.amount>srviv.inventory.Ammunition.amount){return false}
    }
    return true
}
const sumTrade=(trade)=>
{
    console.log(sumTrade)
  let sum=0;
  if(trade.water)
  {
    sum=sum+trade.water.amount*trade.water.value
  }
  if(trade.food)
  {
    sum=sum+trade.food.amount*trade.food.value
  }
  if(trade.medication)
  {
    sum=sum+trade.medication.amount*trade.medication.value
  }
  if(trade.ammunition)
  {
    sum=sum+trade.ammunition.amount*trade.ammunition.value
  }
  return sum

}
const removeTrade=(srviv,trade)=>
{
  console.log(removeTrade)
  if(trade.water)
  {
    srviv.inventory.water.amount=srviv.inventory.water.amount-trade.water.amount
  }
  if(trade.food)
  {
    srviv.inventory.food.amount=srviv.inventory.food.amount-trade.food.amount
  }
  if(trade.medication)
  {
    srviv.inventory.medication.amount=srviv.inventory.medication.amount-trade.medication.amount
  }
  if(trade.ammunition)
  {
    srviv.inventory.ammunition.amount=srviv.inventory.ammunition.amount-trade.ammunition.amount
  }
  return srviv
}
const addTrade=(srviv,trade)=>
{
  if(trade.water)
  {
    srviv.inventory.water.amount=srviv.inventory.water.amount+trade.water.amount
  }
  if(trade.food)
  {
    srviv.inventory.food.amount=srviv.inventory.food.amount+trade.food.amount
  }
  if(trade.medication)
  {
    srviv.inventory.medication.amount=srviv.inventory.medication.amount+trade.medication.amount
  }
  if(trade.ammunition)
  {
    srviv.inventory.ammunition.amount=srviv.inventory.ammunition.amount+trade.ammunition.amount
  }
  return srviv
}

const getsrv=async(name)=>
{
     try{
         const get= await srv.findOne({name:name},{}).exec()

         return get
      } catch
        {
          return null
        }

}


// ---------------------------------------------------------------------------


////-------------------------------------------

//----------------------------
exports.addSurvivor=addSurvivor;
exports.survivorTrade=survivorTrade;
exports.updateloc=updateloc;


//-----------------------------
