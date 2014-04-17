CurrentCost = require('./index');
sys = require('sys');
console.log(sys.inspect(CurrentCost));

var tryit = new CurrentCost.CurrentCost('/dev/ttyUSB0');

tryit.on('incremental', function(data){
  console.log('Incremental Update:')
  console.log(sys.inspect(data));
});

tryit.on('history', function(data){
  console.log('History Update:')
  console.log(sys.inspect(data));
  data.hist['data'].forEach(function(item){console.log(sys.inspect(item));});
});

tryit.on('error', function(data){
  console.log('ERROR: ' + data);
});

tryit.begin();
