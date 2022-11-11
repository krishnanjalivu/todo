const express=require("express");
const bodyparser=require("body-parser");
const app=express();
// const date=require(__dirname+"/date.js")
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB',{useNewUrlParser:true});

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
// mongoose.connect("mongodb://localhost:27017/test")
// let todolists=["BUY FOOD","EAT FOOD"];
// let workitems=[];
const itemSchema=new mongoose.Schema({
  name:String
})
const item=mongoose.model("item",itemSchema);
const item1=new item({
  name:"Welcome to your to do list"
})
const item2=new item({
  name:"Hit + button to add a new item"
})
const item3=new item({
  name:"<-- hit this to delete the item"
})
const defaultitems=[item1,item2,item3];
app.get("/",function(req,res){
  // let day=date.getdate();
  item.find({},function(err,founditems){
    if(founditems.length===0)
    {
      item.insertMany(defaultitems,function(err){
      if(err)
      {
        console.log(err);
      }
      else
      {
        console.log("sucessfully saved defaultitems");
      }
    });
    res.redirect("/");
  }
  else{
  res.render("list",{listtitle:"Today" ,todo:founditems});
  }

  });




});
app.post("/",function(req,res)
{
  const itemname=req.body.newitem;
  const itemnew=new item({
    name:itemname
  });
  itemnew.save();
  res.redirect("/");









  //   if(req.body.list==="work")
  //   {
  //     workitems.push(item);
  //     res.redirect("/work");
  //     console.log(req.body);
  //   }
  //   else
  //   {
  // todolists.push(item);
  // res.redirect("/");
  // console.log(req.body);
  //   }

})
app.post("/delete",function(req,res)
{
  const checkeditem=req.body.checkbox1;
  item.findByIdAndRemove(checkeditem,function(err){
    if(!err)
    {
      console.log("sucessfully deleted items");
      res.redirect("/");
    }
  });
})
app.get("/work",function(req,res){
  res.render("list",{listtitle:"work list",todo:workitems});
})
app.get("/about",function(req,res){
  res.render("about");
})
app.listen(3000,function(){
  console.log("the server is running");
})

























//  var day="";
// switch(today.getDay())
// {
//   case 0:day="sunday";
//   break;
//   case 1:day="monday";
//   break;
//   case 2:day="tuesday";
//   break;
//   case 3:day="wednesday";
//   break;
//   case 4:day="thursday";
//   break;
//   case 5:day="friday";
//   break;
//   case 6:day="saturday";
//   break;
//   default:console.log("there is some error");
// }
// res.render("list",{kindday:day});
