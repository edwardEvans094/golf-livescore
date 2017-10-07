const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true},
  slug: String,
  location: String,
  info: String,
  logo: String,
  baner: String,
  type: {type: Number, require: true},    // 1: giai dau, 2: thi dau
  status: {type: Number, default: 1},
  team: [{
    team_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},     //array golferID
    score: Number
  }]
  
  // created_at: { type: Date, default: Date.now() },
  // updated_at: { type: Date, default: Date.now() }
}, { timestamps: { 
  createdAt: 'created_at',
  updatedAt: 'updated_at' 
  }
});

// tournamentSchema.pre('save', function(next) {
//   var self = this;

//   var currentDate = Date.now();
//   this.updated_at = currentDate;

//   return next();
// });


const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
