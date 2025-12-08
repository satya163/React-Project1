let mj=require("mongojs");
let oid=require("mongojs").ObjectId;
let exp=require("express");
let app=exp();
let cr=require("cors");
app.use(cr());

let bp=require("body-parser");
app.use(bp.json())
app.listen(1000);

let con=mj("mongodb://localhost:27017/new_db");
app.get("/getData",function(req,res){
    con.tbl_user.find(function(err,data){
        res.send({result:data})
    })
})

app.post("/saveData",function(req,res){
    con.tbl_user.insert(req.body);
    res.send({result:"Record Added"})
})

app.post("/removeRecord",function(req,res){
    console.log("Called")
    con.tbl_user.remove({_id:oid(req.body.recId)})
    console.log(req.body.recId)
    res.send({result:'Record Deleted    '})
})
app.post("/updateData",function(req,res){
console.log(req.body)
con.tbl_user.update({_id:oid(req.body.rid)},{$set:{uname:req.body.un,city:req.body.ct}})
res.send({result:"Record Updated"})
})
