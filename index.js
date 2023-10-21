import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January","February","March","April","May","June","July",
"August","September","October","November","December"];

var todayList = [];
var workList = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    let d = new Date();
    let day = weekDay[d.getDay()];
    let mon = month[d.getMonth()];
    let date = d.getDate();
    res.render("index.ejs",{
        head:day+", "+mon+" "+date,
        route:"/",
        list: todayList
    });
})

app.post("/" , (req , res) =>{
    let item = req.body["newTask"];
    if( item !== todayList[todayList.length-1]) todayList.push(item);
    let d = new Date();
    let day = weekDay[d.getDay()];
    let mon = month[d.getMonth()];
    let date = d.getDate();
    res.render("index.ejs",{
        head:day+", "+mon+" "+date,
        route:"/",
        list: todayList
    })
})

app.get("/work",(req,res)=>{    
    res.render("index.ejs",{
        head:"Works",
        route:"/work",
        list: workList
    });
})

app.post("/work" , (req , res) =>{
    let item = req.body["newTask"];
    if( item !== workList[workList.length-1]) workList.push(item);
    res.render("index.ejs",{
        head:"Works",
        route:"/work",
        list: workList
    })
})

app.listen(port , ()=>{
    console.log(`Listening PORT:${port}`);
})