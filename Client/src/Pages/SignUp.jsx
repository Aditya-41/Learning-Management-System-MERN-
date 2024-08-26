import { useState } from "react";
import { toast } from 'react-hot-toast';
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isValidPassword } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setpreviewImage] = useState("");

    const [signupData, setsignupData] = useState({
        fullName : "",
        email : "",
        password : "",
        avatar : ""
    });

    function handleUserInput(e){
        const {name , value} = e.target
        setsignupData ({
            ...signupData,
            [name] : value,
        })
    }

    function getImage(event){
        event.preventDefault();

        const uploadedImage = event.target.files[0];

        if(uploadedImage){
            setsignupData({
                ...signupData,
                avatar : uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load",function(){
                setpreviewImage(this.result)
            });
        }
    } 
    async function creatNewAccount(event){
        event.preventDefault();
        if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar){
            toast.error("Please fill all the Details")
            return;
        }

        // Checking Name field length
        if(signupData.fullName.length < 5){
            toast.error("Name Should be atleast of 5 character")
            return;
        }
        // Checking Valid Email
        if(!isEmail(signupData.email)){
            toast.error("Invalid E-mail Id");
            return;
        }

        // Checking Valid Password
        if(!isValidPassword(signupData.password)) {
            toast.error("Password should be 6 - 16 character long with atleast a number and special character");
            return;
        }

        const formData = new FormData();
        formData.append("fullName",signupData.fullName);
        formData.append("email",signupData.email);
        formData.append("password",signupData.password);
        formData.append("avatar",signupData.avatar);

        // dispatch create account action 

        const responce = await dispatch(createAccount(formData));

        if(responce?.payload?.success){
            navigate("/")
        }

        

        setsignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""
        });

        setpreviewImage("");
    }
    return(
       <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form noValidate onSubmit={creatNewAccount} className="fles flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">
                        Registration Page
                    </h1>

                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img src={previewImage} alt="" className="w-24 h-24 rounded-full m-auto" />
                        ): (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                        )}
                    </label>
                    <input 
                        onChange={getImage}
                        type="file" 
                        name="image_uploads" 
                        id="image_uploads"  
                        className="hidden"
                        accept=".jpg, .jpeg, .png, .svg"
                    />
                    <div className="flex flex-col gap-1">           
                        <label htmlFor="fullName" className="font-semibold"> Name </label>
                        <input 
                            type="text"
                            required 
                            name="fullName" 
                            id="fullName"
                            placeholder="Enter your Password ..."
                            className="bg-transparent px-2 py-1 border"
                            value={signupData.fullName}
                            onChange={handleUserInput}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold"> Email </label>
                        <input 
                            type="email"
                            required 
                            name="email" 
                            id="email"
                            placeholder="Enter your E-mail ..."
                            className="bg-transparent px-2 py-1 border"
                            value={signupData.email}
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
                            value={signupData.password}
                            onChange={handleUserInput}
                        />
                    </div>

                    <button type="submit" className="w-full mt-3 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Create Account
                    </button>
                    <p className="text-center">
                        Already have an account ? <Link to="/login" className="link text-accent cursor-pointer"> Login </Link>
                    </p>
                </form>
            </div>
       </HomeLayout>
    )
}

export default Signup;