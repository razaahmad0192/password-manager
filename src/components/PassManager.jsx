import React from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Logo from './Logo'
import PasswordsCards from './PasswordCards';
// import { json } from 'express';
function PassManager() {

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [showPass, setShowPass] = useState(false)
    const [passwordArray, setpasswordArray] = useState([])
    
    // //For Storing in Local Storage
    // useEffect(() => {
    //     let passwords = localStorage.getItem("passwords");
    //     if (passwords) {
    //         setpasswordArray(JSON.parse(passwords))
    //     }
    // }, [])

    //For Storing in MongoDb
    const getPasswords = async () => {
        const token = localStorage.getItem("token");
        let req = await fetch("http://localhost:3000/api/passwords", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        let passwords = await req.json()
        setpasswordArray(passwords)
        console.log(passwords)
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        getPasswords();
    }, []);
    // //Deleting from local storage
    // const confirmDelete = (index) => {
    //     const updatedArray = passwordArray.filter((_, i) => i !== index);
    //     setpasswordArray(updatedArray);
    //     localStorage.setItem("passwords", JSON.stringify(updatedArray));
    //     toast.dismiss();
    //     toast.success("Password deleted successfully!");
    // };
    //Deleting from mongodb
    const confirmDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3000/api/passwords/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "Deleted successfully");

                // ✅ remove the deleted one instantly from local state
                setpasswordArray((prev) => prev.filter((item) => item._id !== id));


                // ✅ then re-fetch the latest data for accuracy
                // await getPasswords();
            } else {
                toast.error(data.message || "Delete failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error while deleting");
        } finally {
            toast.dismiss();
        }
    };

    // // function to delete an item from local
    // const handleDelete = (index) => {
    //     toast.warn(
    //         <div>

    //             <p className='md:text-base text-sm'>Are you sure you want to delete this password?</p>
    //             <div className="flex gap-2 mt-2">
    //                 <button
    //                     onClick={() => confirmDelete(index)}
    //                     className="bg-red-600 text-white px-3 py-1 md:text-lg text-sm  rounded-md cursor-pointer"
    //                 >
    //                     Yes
    //                 </button>
    //                 <button
    //                     onClick={() => toast.dismiss()}
    //                     className="bg-gray-400 text-white px-3 py-1 md:text-lg text-sm rounded-md cursor-pointer"
    //                 >
    //                     No
    //                 </button>
    //             </div>
    //         </div>,
    //         { autoClose: false, position: "top-center" }
    //     );
    // };
    // Deleting From MongoDb
    const handleDelete = (id) => {
        toast.warn(
            <div>
                <p className="md:text-base text-sm">Are you sure you want to delete this password?</p>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={() => confirmDelete(id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md cursor-pointer"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="bg-gray-400 text-white px-3 py-1 rounded-md cursor-pointer"
                    >
                        No
                    </button>
                </div>
            </div>,
            { autoClose: false, position: "top-center" }
        );
    };
    const togglePassword = () => {
        setShowPass(!showPass)
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async () => {
        const allFilled = Object.values(form).every(
            (value) => value && value.trim() !== ""
        );

        if (!allFilled) {
            toast.error("Please fill all fields before saving");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3000/api/passwords", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Password saved successfully");

                // ✅ Refresh with real MongoDB data
                await getPasswords();

                // ✅ clear input fields
                setform({ site: "", username: "", password: "" });
            } else {
                toast.error(data.message || "Save failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error while saving");
        }
    };
    return (
        <section className='md:container md:mx-auto  py-10 px-4  flex flex-col gap-10 '>
            <div className=' flex flex-col items-center justify-center'>
                <div className="logo">
                    <Logo color='text-black' size='text-4xl' />
                </div>
                <span>You own Password Manager</span>
            </div>
            <div className='inputs&Btn flex flex-col gap-5'>
                <div className="url">
                    <input name='site' onChange={handleChange} value={form.site} className='rounded-full border border-green-200 px-2 py-1 w-full' type="url" id='url' placeholder='Enter website URL' required />
                </div>
                <div className="userPass flex md:gap-15 md:flex-row gap-5 flex-col ">
                    <input name='username' onChange={handleChange} value={form.username} className='rounded-full border border-green-200 px-2 py-1 md:w-[70%]' type="text" placeholder='Enter Username' required />
                    <div className='flex md:w-[30%] relative'>

                        <input onChange={handleChange} name='password' value={form.password} className='rounded-full border border-green-200 px-2 py-1 w-full' type={showPass ? "text" : "password"} placeholder='Enter Password' required />
                        <span onClick={togglePassword}>
                            {
                                showPass ? (
                                    <FaEyeSlash className='absolute  right-5 top-2 w-5 cursor-pointer' />
                                ) :
                                    (
                                        <FaEye className='absolute  right-5 top-2 w-5 cursor-pointer' />
                                    )
                            }
                        </span>
                    </div>
                </div>
                <div className='flex justify-center'>

                    <button onClick={savePassword} className='cursor-pointer bg-green-400 font-semibold border rounded-full px-4 py-1'>
                        Add Password
                    </button>

                </div>
            </div>
            {/* <PasswordsTable passwordArray={passwordArray} onDelete={handleDelete} /> */}
            <PasswordsCards passwordArray={passwordArray} onDelete={handleDelete} />
        </section>
    )
}

export default PassManager
