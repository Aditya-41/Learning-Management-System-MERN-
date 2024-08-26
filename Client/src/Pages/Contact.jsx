import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { isEmail } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axiosInstance";

function Contact () {

    const  [userInput, setUserInput] = useState({
        name : "",
        email : "",
        message : ""
    })

    function handleInputChange (e){
        const {name , value} = e.target;
        console.log(name, value);
        setUserInput ({
            ...userInput,
            [name] : value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.email || !userInput.name || !userInput.message){
            toast.error("All fields are Mandetory")
            return;
        }
        if(!isEmail(userInput.email)){
            toast.error("Invalid Email")
            return;
        }

        try{
            const responce = axiosInstance.post("/contact",userInput)
            toast.promise(responce,{
                loading: "Submitting Your Message",
                success : "Form Submitted Succesfully",
                error : "Failed to Submit the Form"
            });
            const contactResponce = await responce;
            
            if(contactResponce?.data?.succes){
                setUserInput({
                    name : "",
                    email : "",
                    message : ""
                })
            }

        }
        catch(e){
            toast.error("Operation Failed...")
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form 
                    noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem] ">

                    <h1 className="text-3xl font-semibold">
                        Contact Form
                    </h1>

                    <div className="flex flex-col w-full gap-1 ">
                        <label 
                            htmlFor="name"
                            className="text-xl font-semibold">
                                Name
                        </label>
                        <input 
                            type="text" 
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            id="name"
                            name="name"
                            placeholder="Enter Your Name"
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                            
                    </div>

                    <div className="flex flex-col w-full gap-1 ">
                        <label 
                            htmlFor="email"
                            className="text-xl font-semibold">
                                Email
                        </label>
                        <input 
                            type="text" 
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            id="email"
                            name="email"
                            placeholder="Enter Your E-Mail"
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1 ">
                        <label 
                            htmlFor="message"
                            className="text-xl font-semibold">
                                Message
                        </label>
                        <textarea 
                            type="text" 
                            className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                            id="message"
                            name="message"
                            placeholder="Enter Your Message"
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>

                    <button className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm px-2 font-semibold text-lg cursor-pointer">
                        Submit
                    </button>

                </form>
            </div>
            
        </HomeLayout>
    );
}

export default Contact