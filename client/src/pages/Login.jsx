import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
 function Login() {
  const [login, setLogin] = useState({
    id: "",
    pw: "",
  });
   const Loginer =async () => {
    if (login.id === "" || login.pw === "") {
     alert("Please enter all the fields to login.");
      return;
    }
    await axios
      .post("http://localhost:5000/auth/login", {
        id: login.id,
        pw: login.pw,
      })
      .then((res) => {
        console.log(res);
        if (res.data.s === false) {
          throw res.data.error;
        }
        // setjwt_token(res.data.token);
        // setuser_details(res.data.obj);
       alert(`Welcome to HiChat, ${res.data.obj.name}`);
        // navigate("/");
      })
      .catch((error) => {
       alert(error);
      });
  };
  const onChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleLogin = async(event) => {
    event.preventDefault();
    await Loginer();
    setLogin({
      id: "",
      pw: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary">
      <div className="title flex justify-center items-center text-white mb-2 text-2xl font-bold">
      <h1 className="text-5xl text-white my-8 font-bold">🚀Login</h1>
      </div>
      <div className="login flex flex-col items-center">
        <form className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="inputEmail" className="block text-white text-sm font-semibold mb-2">
              Email/Id
            </label>
            <input
              type="text"
              name="id"
              id="inputEmail"
              className="form-input w-full px-4 py-2 rounded-md bg-gray-800 text-white"
              value={login.id}
              onChange={onChange}
            />
           
          </div>
          <div className="mb-4">
            <label htmlFor="inputPassword" className="block text-white text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="pw"
              id="inputPassword"
              className="form-input w-full px-4 py-2 rounded-md bg-gray-800 text-white"
              value={login.pw}
              onChange={onChange}
            />
          </div>
          <div className="mb-6 flex justify-center">
            <button
              type="submit"
              className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={handleLogin}
            >
              Submit
            </button>
          </div>
          <div className="flex justify-center">
            <p className="text-white">
              Not a User? <Link to="/signup" className="text-blue-500">Signup</Link> Now!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
