import { useState } from "react";
import { toast } from 'react-hot-toast';

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const [loginData, setloginData] = useState({
        email : "",
        password : "",
    });

    function handleUserInput(e){
        const {name , value} = e.target
        setloginData ({
            ...loginData,
            [name] : value,
        })
    }


    async function onLogin(event){
        event.preventDefault();
        if(!loginData.email || !loginData.password ){
            toast.error("Please fill all the Details")
            return;
        }



        // dispatch create account action 

        const responce = await dispatch(login(loginData));

        if(responce?.payload?.success){
            navigate("/")
        }

        

        setloginData({
            email: "",
            password: "",
        });
    }
    return(
       <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form noValidate onSubmit={onLogin} className="fles flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">
                        Login Page
                    </h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold"> Email </label>
                        <input 
                            type="email"
                            required 
                            name="email" 
                            id="email"
                            placeholder="Enter your E-mail ..."
                            className="bg-transparent px-2 py-1 border"
                            value={loginData.email}
                            onChange={handleUserInput}
                        />
                    </div>
                    <div className="flex flex-col gap-1">           
                        <label htmlFor="password" className="font-semibold"> Paasword </label>
                        <input 
                            type="password"
                            required 
                            name="password" 
                            id="password"
                            placeholder="Enter your Password ..."
                            className="bg-transparent px-2 py-1 border"
                            value={loginData.password}
                            onChange={handleUserInput}
                        />
                    </div>

                    <button type="submit" className="w-full mt-3 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Login
                    </button>
                    <p className="text-center">
                        Don't have an account ? <Link to="/signup" className="link text-accent cursor-pointer"> Sign-Up </Link>
                    </p>
                </form>
            </div>
       </HomeLayout>
    )
}

export default Signup;