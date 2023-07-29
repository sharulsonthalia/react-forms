import { useEffect, useState } from "react"

const Authenticate = ({token}) => {

    const [successMsg, setSuccessMsg] = useState(null)
    const [error, setError] = useState(null)

    const handleClick = async() => {
        try{
        const response = await fetch(`https://fsa-jwt-practice.herokuapp.com/authenticate`,{
            method: "GET",
            headers: {"Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
        }
        })
        const result = await response.json()
        setSuccessMsg(result.message)

    } catch(error) {
        setError(error.message)
    }} 

    useEffect(()=> {
        console.log(successMsg)
    }, [successMsg])
    return (
        <>
            <h2>Authenticate</h2>
            {successMsg && <p>{successMsg}</p>}
            {error && <p>{error}</p>}
            <button onClick={handleClick}>Authenticate Token</button>
        </>
    )

}

export default Authenticate