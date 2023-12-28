import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Context from "../ContextAPI";

const SignUp = () => {
  const context = useContext(Context);
  const [signup, setSignup] = useState({
    username: "",
    name: "",
    email: "",
    pw: "",
    linkedin: "",
    bio: "",
    portfolio: "",
  });
  const onChange = (event) => {
    setSignup({ ...signup, [event.target.name]: event.target.value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await context.Signuper(signup);
    setSignup({
      username: "",
      name: "",
      email: "",
      pw: "",
      linkedin: "",
      bio: "",
      portfolio: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary">
      <div className="title flex justify-center items-center">
        <h1 className="text-5xl text-white my-8 font-bold">🚀Sign Up</h1>
      </div>
      <div className="signup flex justify-center items-center">
        <form className="w-full max-w-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="inputName"
                className="block text-white text-sm font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="inputName"
                className="form-input w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                value={signup.name}
                onChange={onChange}
              />
            </div>
            <div>
              <label
                htmlFor="inputEmail"
                className="block text-white text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="inputEmail"
                className="form-input w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                value={signup.email}
                onChange={onChange}
              />
            </div>

            <div>
              <label
                htmlFor="inputBio"
                className="block text-white text-sm font-semibold mb-2"
              >
                Bio
              </label>
              <textarea
                name="bio"
                id="inputBio"
                className="form-input w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                value={signup.bio}
                onChange={onChange}
                rows="4"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="inputlinkedin"
                className="block text-white text-sm font-semibold mb-2"
              >
                Linkedin
              </label>
              <input
                type="text"
                name="linkedin"
                id="inputlinkedin"
                className="form-input w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                value={signup.linkedin}
                onChange={onChange}
              />
              <label
                htmlFor="inputlinkedin"
                className="block text-white text-sm font-semibold mb-2"
              >
                Portfolio
              </label>
              <input
                type="text"
                name="portfolio"
                id="inputportfolio"
                className="form-input w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                value={signup.portfolio}
                onChange={onChange}
              />
            </div>

            <div>
              <label
                htmlFor="inputUserName"
                className="block text-white text-sm font-semibold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="inputUserName"
                className="form-input w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                value={signup.username}
                onChange={onChange}
              />
            </div>
            <div>
              <label
                htmlFor="inputPassword"
                className="block text-white text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="pw"
                id="inputPassword"
                className="form-input w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                value={signup.pw}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center mt-4"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
          <div className="signer mt-4 flex justify-center">
            <p className="text-white">
              Already a User?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>{" "}
              Now!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
