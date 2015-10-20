var express = require('express');
var app = express();
var router = require(__dirname + '/router.js');

app.set('port', (process.env.PORT || 1337));
app.use('/', router);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
