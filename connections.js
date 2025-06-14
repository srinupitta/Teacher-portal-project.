const mysql = require("mysql");
const con  = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"student", 
    port:3306
});

con.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log("connection completed succesfully");
    }
})
module.exports.con = con;