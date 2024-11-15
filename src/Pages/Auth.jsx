import { Button, TextField } from '@mui/material'
import { registerAPI, loginAPI } from '../Service/allApi'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Auth = ({ insideRegister }) => {
    const [inputData, setInputData] = useState({
        username: "", email: "", password: ""
    })
    const [isLoged, setIsLoged] = useState(false)
    const navigate = useNavigate()
    // console.log(inputData);
    const handleRegister = async (e) => {
        e.preventDefault()
        console.log("Inside Handle Register");
        if (inputData.username && inputData.email && inputData.password) {
            try {
                const result = await registerAPI(inputData)
                if (result.status == 200) {
                    alert(`Welcome ${result.data.username}, Please Login to explore our website`)
                    navigate('/login')
                    setInputData({ username: "", email: "", password: "" })
                } else {
                    if (result.response.status == 406) {
                        alert(result.response.data)
                        setInputData({ username: "", email: "", password: "" })
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Please fill the full form")
        }

    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (inputData.email && inputData.password) {
            try {
                const result = await loginAPI(inputData)
                if (result.status == 200) {
                    sessionStorage.setItem("user", JSON.stringify(result.data.user))
                    sessionStorage.setItem("token", result.data.token)
                    setIsLoged(true)
                    setTimeout(() => {
                        setInputData({ username: "", email: "", password: "" })
                        navigate('/')
                        setIsLoged(false)
                    }, 2000)
                } else {
                    alert(result.response.data)
                }
            } catch (error) {
                console.log(error);

            }
        } else {
            alert("Please fill the form completly")
        }
    }


    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="min-h-96 p-5 min-w-96 flex flex-col items-center shadow-md rounded-md  bg-green-300 ">
                <h1 className='text-2xl text-cyan-600 p-5 font-bold'>Sign {insideRegister ? "Up" : "In"} Your Account</h1>
                {
                    insideRegister &&
                    <TextField id="username" label="Username" variant="outlined" value={inputData.username} onChange={e => setInputData({ ...inputData, username: e.target.value })} />
                }
                <TextField sx={{ mt: 2 }} id="email" label="E-mail" variant="outlined" value={inputData.email} onChange={e => setInputData({ ...inputData, email: e.target.value })} />
                <TextField sx={{ mt: 2 }} id="password" label="Password" variant="outlined" value={inputData.password} onChange={e => setInputData({ ...inputData, password: e.target.value })} />
                {
                    insideRegister ?
                        <div className='flex justify-center items-center flex-col'>
                            <Button onClick={handleRegister} variant="contained" sx={{ p: 2, mt: 2 }}>Register</Button>
                            <p className='pt-5'>Alerady a user? Please click here to  <Link to={'/login'} className='text-blue-500 font-semibold'>Login</Link> </p>
                        </div>

                        :
                        <div className='flex justify-center items-center flex-col'>
                            <Button onClick={handleLogin} variant="contained" sx={{ p: 2, mt: 2 }}>Login</Button>
                            <p className='pt-5'>You don't have account  <Link to={'/register'} className='text-blue-500 font-semibold'>Register</Link> </p>
                        </div>
                }
            </div>
        </div>
    )
}

export default Auth