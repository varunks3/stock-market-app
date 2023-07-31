import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// 3D4EMJY6INORUQLQ
function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("login clicked")
      
      const url = "https://stock-market-varunks3.vercel.app/login";
      const data = {
        email: email,
        password: password,
      };
      console.log(data)
      axios.post(url, data).then((response) => {
        console.log(response);
        localStorage.setItem('user', response.data.token)
        window.location.href = "/home";
      }).catch((e)=>{
        console.log(e)
      });
    };

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-indigo-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-indigo-700  uppercase decoration-wavy">
                   Sign in
                </h1>
                <form  onSubmit={handleSubmit} className="mt-6">
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
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transhtmlForm bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <Link  className="font-medium text-indigo-600 hover:underline" to="/">Register</Link>
                </p>
            </div>
        </div>
    </>
  );
}

export default Login;
