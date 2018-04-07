const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.static("public"));

app.listen(PORT, function(){
    console.log(`Logic shaper started on at port : ${PORT} `);
});
