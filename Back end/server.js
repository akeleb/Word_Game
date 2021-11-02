const express = require("express");
const conn = require("./database/db");

const app = express();

 
 var bodyParser = require("body-parser");
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/points',(req,res)=>{
     let sql = "SELECT * FROM game ORDER BY point DESC LIMIT 10";
     conn.query(sql, (err, row, field) => {
  
  return res.send({points:row})
  });
  
});


app.post('/addPoint',(req,res)=>{
        let sql = "INSERT INTO game SET ?";
    let arg = {
     point: req.body.point,
    
    };

  
     conn.query(sql, arg, function (err, row, field) {
      
      if (err){
     return res.status(400).send(err)
      } 
      else {
     return res.send(true)
       
      }
     });
   
})
app.listen(3000, () => {
 console.log(`Server started on port 3000’);
});