import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../../util'
import { ToastContainer } from 'react-toastify'
const home = () => {
  const [LoggedInUser, setLoggedInUser] = useState('')
 const [Products, setProducts] = useState('')
 useEffect(() => {
 setLoggedInUser(localStorage.getItem('loggedInUser'))
 }, [])
 const navigate=useNavigate()
const HandleLogout=(e) => {
  localStorage.removeItem('token')
  localStorage.removeItem('loggedInUser')
  handleSuccess("User Logged Out")
  setTimeout(() => {
    navigate("/login")
  }, 1000);
}


const fetchproducts=async () => {
  try {
    const url="https://authentication-project-smoky.vercel.app/products"
    const headers={
      headers:{
      "Authorization": localStorage.getItem('token')}
    }
    const response=await fetch(url,headers);
    const result= await response.json();
    console.log(result)
    setProducts(result)
  } catch (err) {
    handleError(err)
    
  }
}

useEffect(() => {
fetchproducts()
}, [])


  return (
    <div>
      {LoggedInUser}
      <button onClick={HandleLogout}>Logout</button>
      
      <div>
        {
         Products && Products?.map((item,index)=>{
          return(
            <ul key={index}>
             
             <li> <span>{item.name}:{item.price}</span></li>
            </ul>)
          })
        }
      </div>
      
      <ToastContainer/>
      
    </div>
  )
}

export default home
