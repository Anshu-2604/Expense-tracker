import { useState, useEffect } from 'react';
import "./Dashboard.css";
import { useNavigate } from 'react-router-dom';
function Dashboard() {
    const navigate = useNavigate();
    const [name, Setname] = useState("");
    const[expensename,Setexpensename]=useState("")
    const[amount,Setamount]=useState("")
    const[showPopup,SetshowPopup]=useState(false)
    const[expense_list,Setexpense_list]=useState({})
    const[total_amount,Settotal_amount]=useState(0)
      

    useEffect(() => {
        async function dashboard() {
            try {
                const response = await fetch("https://expense-tracker-c2f4.onrender.com//dashboard",{
                    credentials:'include'
                });

                const res = await response.json();

                Setname(res.msg);
            } catch (err) {
                console.log(err);
            }
        }

        dashboard();
        fetchexpense();
    }, []);
    useEffect(() => {
    totalexpense();
}, [expense_list]); 
    async function Logout(){
        let response=await fetch("https://expense-tracker-c2f4.onrender.com/Logout",{
            method:"POST",
            credentials:"include"
        })

        let result=await response.json()

        alert(result.message)
        navigate("/Login")

    }
    function close(){
        SetshowPopup(false)
        window.location.reload()
    }
   async function handeladdexpense(e){
    e.preventDefault() 
    try{ 
        let expense_response=await fetch("https://expense-tracker-c2f4.onrender.com/Addexpense",{
            method:"POST",
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                item_name:expensename,
                item_amount:amount
            })
        })
        let result=await expense_response.json()
        alert(result.message)
    }
    catch(err){
        alert(err)

    }

    }
    async function fetchexpense(){
        let expenselist=await fetch("https://expense-tracker-c2f4.onrender.com/fetchexpense",{
            credentials:"include"

        })
        try{
            let result=await expenselist.json()
           Setexpense_list(result)
         
        }
        catch(err){
            alert(err)
        }
    }
    function totalexpense(){
        let sum=0
         Object.entries(expense_list).map(([name,amount])=>{
                sum=sum+Number(amount)

            })
            Settotal_amount(sum)
    }
    async function handledelete(){fetchexpense
        let response=await fetch("https://expense-tracker-c2f4.onrender.com/delete",{
            credentials:'include',
            method:"DELETE"
        })
        try{ 
        let result=await response.json()
        alert(result.message)

        }
        catch(err){
            alert(err)
        }

    }

    return (
        <>
        <div className='Sidebar'>
            <h3>Welcome {name}</h3>
            <button onClick={(e)=>{SetshowPopup(true)}}>Add expense</button>
            <button onClick={handledelete}>Delete expense</button>
            <button onClick={Logout}>Logout</button>
            <h3>Total expense ₹{total_amount}</h3>
        </div>
            <div className='Expense-list'>
    {Object.keys(expense_list).length === 0 ? (
        <p>No expense yet</p>
    ) : (
        Object.entries(expense_list).map(([itemName, amount]) => (
            <div key={itemName} className="expense-item">
                <span>{itemName}</span>
                <span>₹{amount}</span>
            </div>
        ))
    )}
</div>
{showPopup && (
    <div className="popup">

        <div className="popup-box">

            <h2>Add Expense</h2>
        <form>
            <label>Expense name</label>
            <input name='expensename' onChange={(e)=>{Setexpensename(e.target.value)}}
                type="text"
                placeholder="eg:Travel,Gym,Food "
            />
        <label>Expense amount</label>
            <input name='amount'
            onChange={(e)=>{Setamount(e.target.value)}}
                type="number"
                placeholder="eg:67,345,3457"
            />

            <button type='button' onClick={handeladdexpense}>Add</button>

            <button onClick={close}>
                Close
            </button>

            </form>

        </div>

    </div>
)}
        </>
    );
}

export default Dashboard;