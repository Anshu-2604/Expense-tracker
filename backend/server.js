let express=require("express")
let cors=require("cors")
const usermodel=require("../backend/model/userschema")
const workspace=require("../backend/model/Userworkspace")
let mongoose=require("mongoose") 
let bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")

const app = express();
app.use(cookieParser())
app.use(cors({
    origin: "https://expense-tracker-eta-lyart-50.vercel.app",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


mongoose.connect("mongodb://localhost:27017/usersdata")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("Error:", err));

function isprotected(req,res,next){
    let token=req.cookies.token
    if(!token){
      return  res.status(401).json({message:"Access token is required"})
    }
    try{ 
    let decode=jwt.verify(token,"Himmu",{algorithms:["HS256"]})
    req.Userid=decode.name
    next()
    }
    catch(err){
        return res.status(401).json({message:err})

    }

  }


app.post("/", async (req,res)=>{
    const {Name,Password,Email}=req.body
    let extinguisher=await usermodel.findOne({name:Name})
    if(extinguisher){
        res.json({message:"this username already exist try again with a new username"})
    }
    else{ 
    try{ 
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(Password,salt, async function (err,hash){
            const user=await usermodel.create({
                name:Name,
                password:hash,
                email:Email
            })
        const items=await workspace.create({
        owner: user._id,
        name:Name,
        content:{}
    })

        })
    })
 
    res.json({message:"user created successfully"})

}
catch(err){
    res.status(500).json({message:"Internal server error"})
}
    }
})
app.post("/Login" ,async function(req,res){
    const {Username,Password}=req.body
    const isexist=await usermodel.findOne({name:Username})
    try{
        if(!isexist){
            return res.status(404).json({message:"user do not exist"})
        }
        else if(isexist){
            bcrypt.compare(Password,isexist.password,function(err,truepassword){
                if(!truepassword){
                      return res.status(401).json({message:"Wrong password"})
                }
                else{
                    let token=jwt.sign({name:Username},"process.env.JWT_SECRET",{
                       
                    }
                    
                )
                    res.cookie("token",token)
                    return res.status(200).json({message:"login successfully"})
                }
            })
        }
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
})
app.get("/dashboard", isprotected,function(req,res){
    const name=req.Userid
    res.json({msg:name})
})
app.post("/Logout",function(req,res){
    res.clearCookie("token").json({message:"Logout sucessfully"});
    
})
app.post("/Addexpense",isprotected,async function(req,res){
    let user_name=req.Userid
    const{item_name,item_amount}=req.body
    if(item_amount==""){
        res.json({message:"Add a valid amount"})
    }
else{ 
    try{ 
    let user_data=await workspace.findOne({name:user_name})
    user_data.content[item_name]=item_amount
    user_data.markModified('content')
    await user_data.save() 
    res.json({message:"Expense added successfully"})
    }
    catch(err){
res.status(500).json({message:"something went wrong"})
    }
}

})
app.get("/fetchexpense",isprotected,async function(req,res){
    let user=req.Userid
    if(!user) throw new Error("No such user exist");
    try{ 
    let expenselist=await workspace.findOne({name:user})
    res.status(200).json(expenselist.content)
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"})

    }

})
app.delete("/delete",isprotected,async function(req,res){
    let user=req.Userid
    if(!user){
        res.status(400).json({message:"User do not exist"})
    }

    try{ 
    let data=await workspace.findOne({name:user})
    let expenses=data.content
    Object.keys(expenses).forEach(keys=>delete expenses[keys])
    data.markModified("content")
    await data.save()
    res.status(200).json({message:"All expenses deleted successfully"})
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"})

    }

})
app.listen(3000,()=> console.log("server is working fine"))