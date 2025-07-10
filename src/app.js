const express = require('express');

const app = express();

// app.use("/user",(req,res)=>{
//     res.send("HAHAHAHAHA")
// })
//this will only handle get call to /user
app.get("/user",(req,res)=>{
    res.send({firstName:"Suraj",lastName:"Upadhyay"})
})

app.post("/user",(req,res)=>{
    res.send("Data successfully stored in the database.")
})

app.delete("/user",(req,res)=>{
    res.send("Data Deleted successfully!")
})

app.patch("/user",(req,res)=>{
    res.send("Data updated successfully!")
})
app.put("/user",(req,res)=>{
    res.send("Data updated successfully!")
})
//This will match all the http method api call to /test
app.use("/test",(req,res)=>{  //This function is known as request handler 
    res.send("Testing the server!")
})
app.listen(3000,()=>{
    console.log("Server is successfully listning on port 3000...")
})