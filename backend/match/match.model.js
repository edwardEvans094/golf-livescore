const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  name: { type: String, required: true},
  time: Date,
  tournament_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', require: true},
  tee_time: String,
  par: [{ type: Number }],
  type: { type: Number, default: 1, require: true},   // 1: normal 2: single match, 3: foursome
  golfer: [{
    golfer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Golfer', require: true},
    team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', require: true},
    result: [{ type: Number }],
    display: [{ type: Number, default: 1 }],   // 0: none, 1: normal display, 2: highlight, 3: unknown
    total_result: Number
  }],
  status: {type: Number, default: 1}
}, { timestamps: { 
  createdAt: 'created_at',
  updatedAt: 'updated_at' 
  } 
});

matchSchema.pre('save', function(next) {
  var self = this;
  this.golfer.forEach((golfer)=>{
    golfer.display = new Array(this.par.length).fill(1);
  })
  //caculate score
  if(this.type == 2 || this.type == 3){   /// single match
    this.par.forEach((par, parIndex) => {
      let tmpObj = {};
      for(let i=0; i < this.golfer.length; i++){
        if(!tmpObj || tmpObj.minscore == undefined){
          tmpObj = {
            teamId: this.golfer[i].team_id,
            minscore: this.golfer[i].result[parIndex],
            golferIndex: i
          }  
          this.golfer[i].display[parIndex] = this.golfer[i].result[parIndex] == -1 ? 3 : 2; //highlight  
        }
        else if(this.golfer[i].result[parIndex] == tmpObj.minscore){
          if(this.type == 3 && tmpObj.teamId !== this.golfer[i].team_id.toString()) continue;
                    
          this.golfer[tmpObj.golferIndex].display[parIndex] = this.golfer[i].result[parIndex] == -1 ? 3 : 1; 
          this.golfer[i].display[parIndex] = this.golfer[i].result[parIndex] == -1 ? 3 : 1; 
          
        }
        else if(this.golfer[i].result[parIndex] < tmpObj.minscore && this.golfer[i].result[parIndex] <= par){

          this.golfer[tmpObj.golferIndex].display[parIndex] = 1 //unhighlight
          tmpObj = {
            teamId: this.golfer[i].team_id,
            minscore: this.golfer[i].result[parIndex],
            golferIndex: i
          }
          this.golfer[i].display[parIndex] = this.golfer[i].result[parIndex] == -1 ? 3 : 2; 
        }
        console.log(tmpObj);
      }
    });

    for(let i=0; i < this.golfer.length; i++){
      this.golfer[i].total_result = this.golfer[i].display.filter(x=>{return x == 2}).length;
    }
  } 
  // else if(this.type == 3){    //foursome match



  // }
  return next();
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
