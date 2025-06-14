const express = require("express");
const port = 8005;
const app =express();
const mysql =  require("./connections").con;
app.set("view engine","hbs");
app.set("views","./views");
app.use(express.json());
app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
   res.render("teacher");
})
app.get("/index",(req,res)=>{
   res.render("index")
})
app.get("/add",(req,res)=>{
   res.render("add");
})
app.get("/search",(req,res)=>{
   res.render("search");
})
app.get("/update",(req,res)=>{
   res.render("update");
})
app.get("/delete",(req,res)=>{
   res.render("delete");
})
app.get("/view",(req,res)=>{
   let qry = "select * from student";
   mysql.query(qry,(err,results)=>{
      if(err){
         throw err;
      }
      else{
         res.render("view",{data:results});
      }
   })
})

// app.get("/teachersubmit",(req,res)=>{
//    const {username,pass} = req.query;
//    let qry = "select * from teachher where username=? and password=?";
//    mysql.query(qry,[username,pass],(err,results)=>{
//       if(err){
//          throw err;
//       }
//       else if(results.length>0){
//          res.render("index");
//       }
//       else{
//          res.render("teacher",{msggg:true});
//       }
//    })
// })

app.post("/teacher-submit",(req, res) => {
   const username = req.body.username;
   const password = req.body.password; 
   let qry = 'SELECT * FROM teacher WHERE username=? and pass=?';
   mysql.query(qry, [username, password], (err, result) => {
       if(err){
         throw err;
       }
       else {  
         if(result.length>0){
            res.render("index");
         }
         else{
            res.render("teacher",{msggg:true})
         }
       }
   });
});

app.get("/addstudent",(req,res)=>{
   const {name,rollno,phone,email,gender} = req.query;
   let qry = "select * from student where studentRollno=? or studentPhno=?";
   mysql.query(qry,[rollno,phone],(err,results)=>{
      if(err){
         throw err;
      }
      else {
         if(results.length>0){
            res.render("add",{checkmsg:true});
         }
         else{
           let qry2 = "insert into student values(?,?,?,?,?)";
            mysql.query(qry2,[name,rollno,phone,email,gender],(err,results)=>{
               if(results.affectedRows>0){
                  res.render("add",{msg:true});
               }
            })
         }
      }
   })
})
app.get("/searchstudent",(req,res)=>{
   const {rollno} = req.query;
   let qry = "select * from student where studentRollno=?";
   mysql.query(qry,[rollno],(err,results)=>{
      if(err){
         throw err;
      }
      else{
         if(results.length>0){
            res.render("search",{msg1:true})
         }
         else{
            res.render("search",{msg2:true})
         }
      }
   })
})
app.get("/updatesearch",(req,res)=>{
   const {rollno} = req.query;
   let qry = "select * from student where studentRollno=?";
   mysql.query(qry,[rollno],(err,results)=>{
      if(err){
         throw err; 
      }
      else{
         if(results.length>0){
            res.render("update",{msg1:true,data:results})
         }
         else{
            res.render("update",{msg2:true})
         }
      }
   })
})
app.get("/updatestudent",(req,res)=>{
   const {name,rollno,phone,email,gender} = req.query;
   let qry = "update student set studentName=?,studentPhno=?,studentEmail=?,studentGender=? where studentRollno=?";
   mysql.query(qry,[name,phone,email,gender,rollno],(err,results)=>{
      if(err){
         throw err;
      }
      else {
         if(results.affectedRows>0){
            res.render("update",{umsg:true});
         }
      }
   })
});
app.get("/removestudent",(req,res)=>{
   const {rollno} = req.query;
   let qry = "delete from student where studentRollno = ?";
   mysql.query(qry,[rollno],(err,results)=>{
      if (err){
         throw err;
      }
      else{
         if(results.affectedRows>0){
            res.render("delete",{dmsg1:true});
         }
         else{
            res.render("delete",{dmsg2:true});
         }
      }
   })
})
app.listen(port,(err)=>{
    if(err){
        throw err;
    }
    else {
        console.log(`server running succesfully at port : ${port}`);
    }
})