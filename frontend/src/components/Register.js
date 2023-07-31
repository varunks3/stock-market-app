import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked")
    
    const url = "https://stock-market-varunks3.vercel.app/register";
    const data = {
      name: name,
      email: email,
      password: password,
    };
    console.log(data)
    axios.post(url, data).then((response) => {
      console.log(response);
      setmessage('Registered successfully. Please Login')
    }).catch((e)=>{
      console.log(e)
      setmessage('Registration failed')
    });
  };

  return (
    <>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-indigo-700  uppercase decoration-wavy">
            Register to Stock market application
          </h1>
            
            <form  onSubmit={handleSubmit} className="mt-6">
              <div className="mb-2">
                <label
                  htmlFor="text"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"onClick={(e) => handleSubmit(e)}>
                  Register
                </button>
              </div>
            </form>
           <p className="mt-8 text-xs font-light text-center text-gray-700">{message}</p> 
            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Already have an account?{" "}
              <Link
                className="font-medium text-indigo-600 hover:underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
    </>
  );
}

export default Register;
