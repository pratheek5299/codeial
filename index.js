const express = require('express');
const app = express();

//by default port number is 80
const port = 8000;

app.listen(port, function(err){
    if(err){
        // console.log('Error: ', err);
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})