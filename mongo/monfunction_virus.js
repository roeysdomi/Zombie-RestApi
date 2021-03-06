
// const mongoose = require('mongoose');
var srv = require('../model/Survivor');
var vir = require('../model/Virus');


//main function add report to the viri database (virus db)
const addreport=async(name)=>
{
    const srviv=await getsrv(name)
    let report=await getreport(srviv.last_location)
    if(report){
       let reportamount=report.reports+1;
       console.log("this is the report amount:"+reportamount)
      await vir.findOneAndUpdate({last_location:srviv.last_location},
         {
           $set:
           {
               reports:reportamount,
           }
         },
         {new:true});
        return  checkIf3(srviv.last_location)
    }
   else{

     var savereport=new vir ({
       reports:1,
       last_location:srviv.last_location,
     })
     savereport.save()
     return "report approved , first one in this area"
   }


}
// Helper function check if its reached 3 reports for the same location
const checkIf3=async(loc)=>
{
  let report=await getreport(loc)
  if(report.reports>=3)
  {
      return updateInfected(loc)
  }
  return "report accpeted , no mass infection yet"

}
// helper function -update all users in the same location as infected
const updateInfected=async(loc)=>
{
  try{
   await srv.updateMany({last_location:loc},{$set:{isInfected:"True"}},{new:true})
   return "All the users in this area were infected"
 }catch
 {
     return "error in update infected"
 }

}

//helper function
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
//get report base on location
const getreport=async(loc)=>
{
     try{
         const get= await vir.findOne({last_location:loc},{}).exec()

         return get
      } catch
        {
          return null
        }

}


// ---------------------------------------------------------------------------


////-------------------------------------------

//----------------------------
exports.addreport=addreport;



//-----------------------------
