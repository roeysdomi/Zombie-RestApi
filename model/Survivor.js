const mongoose = require('mongoose');

const SurvivorSchema = new mongoose.Schema({

    name:{ type: String , required: true ,unique:true},
    age:{type:String, required: true},
    last_location:{
               latitude: {type: String,required: false},
               longitude:{type: String,required: false},
                  },
   isInfected:{type: String,required: true},
   inventory :{
             water:{
                     amount:{type: Number,required: false}
                     ,value:{type: Number,default:4}
                   },
             food:{
                     amount:{type: Number,required: false}
                     ,value:{type: Number,default:3}
                   },
             medication:{
                     amount:{type: Number,required: false}
                     ,value:{type: Number,default:2}
                   },
             ammunition:{
                     amount:{type: Number,required: false}
                     ,value:{type: Number,default:1}
                   }
               }

});

const Survivor = mongoose.model('Survivor', SurvivorSchema);

module.exports = Survivor;
