import { useState } from "react";
import Context from "./ContextAPI";
import axios from "axios";
import {uid} from 'uid';
import { useNavigate } from "react-router-dom";
const ContextData = ({ children }) => {
  const navigate=useNavigate();
  const [jwt_token, setjwt_token] = useState(null);
  const [user_details, setuser_details] = useState({});
  const [session, setsession] = useState(null);
  const [repo, setrepo] = useState({})
  function ValidateEmail(mail) {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return false;
    }
    return true;
  }
  const Signuper = async (signup) => {
    if (signup.bio.length >= 500) {
      alert("Bio should be less than 500 characters.");
      return;
    }
    if (
      signup.pw === "" ||
      signup.email === "" ||
      signup.name === "" ||
      signup.username === ""
    ) {
      alert("No field should be left empty.");
      return;
    }
    if (ValidateEmail(signup.email)) {
      alert("Please enter a valid email ID.");
      return;
    }
    if (signup.pw.length < 8) {
      alert("Password should be of minimum 8 characters.");
      return;
    }

    await axios
      .post("http://localhost:5000/auth/signup", {
        name: signup.name,
        username: signup.username,
        email: signup.email,
        password: signup.pw,
        linkedin: signup.linkedin,
        bio: signup.bio,
        portfolio: signup.portfolio,
        friends: [{name:"init",id:"init"}],
        readme: "",
        repos: [],
      })
      .then((res) => {
        console.log(res);
        console.log("Done");
        alert(`Welcome to GHB, ${signup.name}`);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        alert(
          "The Email or the username number is already in use, please try again!",
        );
      });
  };
  const Loginer = async (login) => {
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
        setjwt_token(res.data.token);
        setuser_details(res.data.obj);
        let ok=uid(16);
        setsession(ok);
        alert(`Welcome to GHB, ${res.data.obj.name}`);
        navigate(`/home?session=${ok}`);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const AddRepo=async(name, type)=>{
    try {
      const response=await axios.post("http://localhost:5000/repos/create",{
        name:name,type:type,userid:user_details.key
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  const GetRepo=async(id)=>{
    try {
      // let ids=id.toString();
      // console.log(id);
      const response=await axios.get(`http://localhost:5000/repos/getrepo/${id}`);
      return response.data.repo;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Context.Provider value={{ Signuper, Loginer, user_details,setuser_details, jwt_token,setjwt_token,session,AddRepo,GetRepo,repo,setrepo }}>
      {children}
    </Context.Provider>
  );
};
export default ContextData;
