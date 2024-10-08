import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setuserInput] = useState({
        title : "",
        category : "",
        createdBy : "",
        description : "",
        thumbnail : null,
        previewImage : ""
    });

    function handleImageUpload (e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load",function () {
                setuserInput({
                    ...userInput,
                    previewImage : this.result,
                    thumbnail : uploadedImage
                })
            })
        }
    }

    function handleUserInput(e) {
        const {name , value} = e.target;
        setuserInput({
            ...userInput,
            [name] : value
        })
    }

    async function onFormSubmit (e){
        e.preventDefault();

        if(!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.createdBy){
            toast.error("All Fileds are mandatory")
            return;
        }
        const responce = await dispatch(createNewCourse(userInput));
        if(responce?.payload?.success){
            setuserInput({
                title : "",
                category : "",
                createdBy : "",
                description : "",
                thumbnail : null,
                previewImage : ""
            });
            navigate("/courses")
        }
        
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form 
                    noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative">
                    <Link className="absolute top-8 text-2xl link text-accent cursor-pointer ">
                        <AiOutlineArrowLeft/>
                    </Link>
                    <h1 className="text-center text-2xl font-bold">
                        Create New Course
                    </h1>
                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label 
                                    htmlFor="image_uploads"
                                    className="cursor-pointer"
                                    >
                                    {userInput.previewImage ? (
                                        <img 
                                            src={userInput.previewImage}
                                            className="w-full h-44 m-auto border"
                                        />
                                    ) : (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg">Upload Your Course Thumbnail</h1>
                                        </div>
                                    )}
                                </label>
                                <input 
                                    type="file" 
                                    name="image_uploads" 
                                    id="image_uploads" 
                                    className="hidden "
                                    accept=".jpg, .jpeg, .png"
                                    onChange={handleImageUpload}
                                    />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className="text-lg font-semibold text-yellow-500">
                                    Course Title :
                                </label>
                                <input 
                                    required
                                    type="text" 
                                    name="title" 
                                    id="title"
                                    className="bg-transparent px-2 py-1 border " 
                                    placeholder="Enter Course Title ...."
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                    />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="createdBy" className="text-lg font-semibold text-yellow-500">
                                    Course Instructor :
                                </label>
                                <input 
                                    required
                                    type="text" 
                                    name="createdBy" 
                                    id="createdBy"
                                    className="bg-transparent px-2 py-1 border " 
                                    placeholder="Enter Course Instructor ...."
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                    />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="category" className="text-lg font-semibold text-yellow-500">
                                    Course Category :
                                </label>
                                <input 
                                    required
                                    type="text" 
                                    name="category" 
                                    id="category"
                                    className="bg-transparent px-2 py-1 border " 
                                    placeholder="Enter Course category ...."
                                    value={userInput.category}
                                    onChange={handleUserInput}
                                    />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="description" className="text-lg font-semibold text-yellow-500">
                                    Course Description :
                                </label>
                                <textarea 
                                    required
                                    type="text" 
                                    name="description" 
                                    id="description"
                                    className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none" 
                                    placeholder="Enter Course description ...."
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                    />
                            </div>
                        </div>
                    </main>
                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 h-10 translate-all ease-in-out rounded-md py-2 font-semibold text-lg">
                        Create Course
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}


export default CreateCourse;