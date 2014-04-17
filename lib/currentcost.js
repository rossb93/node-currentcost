var event = require('events'), 
//EventEmitter = require('events').EventEmitter,
    util = require('util'),
    spawn = require("child_process").spawn,
    xml = require('./xml2json');

function CurrentCost(device) {
  var self = this;
  self.device = device;
}

//util.inherits(CurrentCost, EventEmitter);
CurrentCost.prototype = new event.EventEmitter();

CurrentCost.prototype.begin = function(){
  var that = this;
  dir = __dirname;
  var dataprocess = spawn("python", [dir + "/../python/tailserial.py", that.device]);
  dataprocess.stdout.on('data', function (data) {
    try{
      var tosend = formatData(xml.parse(new String(data), "", false));
      if(tosend)
        that.emit(( tosend.hasOwnProperty('hist')? 'history' : 'incremental' ), tosend);
    }
    catch(err){
      that.emit('error', data+"");
    }
  });
  dataprocess.stderr.on('data', function (data) {
    that.emit('error', data+"");
  });  
};

function formatData(data){
  if(data.hasOwnProperty('msg')){
    return data['msg'];
  }
}
module.exports = CurrentCost
