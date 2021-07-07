const mongoose = require('mongoose');

const VirusSchema = new mongoose.Schema({

    reports:{ type: Number , required: true ,default:0},

    last_location:{
               latitude: {type: String,required: false},
               longitude:{type: String,required: false},
                  }

});

const Virus = mongoose.model('Virus', VirusSchema);

module.exports = Virus;
