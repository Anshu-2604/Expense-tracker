
import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"

function ProtectedRoute({ children }) {
    const [isAuth, setIsAuth] = useState(null)

    useEffect(() => {
        fetch("https://expense-tracker-c2f4.onrender.com/dashboard", {
            credentials: "include"
        })
        .then(res => {
            if (res.ok) setIsAuth(true)
            else setIsAuth(false)
        })
        .catch(() => setIsAuth(false))
    }, [])

    if (isAuth === null) return <p>Loading...</p>
    if (isAuth === false) return <Navigate to="/Login" />
    return children
}

export default ProtectedRoute