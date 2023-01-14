var express = require('express');
var port = '4000';
var app = express();
app.use('/', express.static('../AppFrame/dist'));
module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
});