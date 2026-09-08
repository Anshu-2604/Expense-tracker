import { useState } from "react"
import "./Home.css"
import { Toaster,toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
 
function Home(){
    let navigate=useNavigate("")
    let[name,Setname]=useState("")
    let[password,Setpassword]=useState("")
    let[email,Setemail]=useState("")
    function clearinput(){
        Setname("")
        Setpassword("")
        Setemail("")
    }
    async function submit(e){
        e.preventDefault()
        try{ 
        let request=await fetch("https://expense-tracker-c2f4.onrender.com/",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                Name:name,
                Password:password,
                Email:email

            })
        })
        let data = await request.json() 
        toast.success(data.message)
        clearinput()
    }
    catch(err){
        alert(err)
    }
    }
 return (
    < div className="home-container">

    <form onSubmit={submit} method="Post">
        <h2>Signup here😉</h2>
        <label>Username</label>
        <input placeholder="eg:John Doe" value={name} onChange={(e)=>Setname(e.target.value)}></input>
        <label>Email</label>
        <input placeholder="eg:John@gmail.com" value={email} onChange={(e)=>Setemail(e.target.value)}></input>
        <label>Password</label>
        <input placeholder="eg:John@324545" type="password" value={password} onChange={(e)=>Setpassword(e.target.value)}></input>
        <button onClick={()=>navigate("/Login")}>Sign up</button>
    </form>
  <button className="home-login-btn" onClick={()=>navigate("/Login")}>Already have a account?</button>

       <Toaster position='top-right'/>
    </div>
    
   
 )

}
export default Home