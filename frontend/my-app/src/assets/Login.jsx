import { useState } from "react"
import { Toaster,toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import "./Login.css"
function Login(){
    const navigate=useNavigate("")
    const[username,Setusername]=useState("")
    const[password,Setpassword]=useState("")
   async function handleLogin(e){
    e.preventDefault()
        const response= await fetch("https://expense-tracker-c2f4.onrender.com/Login",{
            method:"POST",
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                Username:username,
                Password:password
            })
        }

        )
        let reply= await response.json()
        if(response.ok){
            toast.success(reply.message)
            navigate("/dashboard")
        }
        else{
            toast.error(reply.message)
        }


    }
    return(
        <div className="login-container">
            
        <form>
              <h2 style={{color:"black"}}>Welcome Back 😉</h2>
            <label>Username</label>
            <input placeholder="eg:John" value={username} onChange={(e)=>Setusername(e.target.value)}></input>
            <label>Password</label>
            <input placeholder="eg:John@8949" value={password} onChange={(e)=>Setpassword(e.target.value)}></input>
            <button onClick={handleLogin} type="button">Login</button>
        </form>
        <button className="login-new-btn" onClick={()=>navigate("/")}>New user?</button>
         <Toaster position='top-right'/>
        </div>
    )
}

export default Login