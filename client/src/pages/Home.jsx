import React, { useState, useEffect, useContext } from "react";
import Modal from "../components/ReadmeModal";
import Context from "../ContextAPI";
import RepoList from "../components/RepoList";
import { useLocation } from "react-router-dom";
const ProfilePage = () => {
  const location = useLocation();
  console.log(location.pathname);
  const context = useContext(Context);
  const [modal, setmodal] = useState(false);
  const [rows, setRows] = useState(1);
  const { name, username, bio, linkedin, portfolio, readme } =
    context.user_details;
  useEffect(() => {
    const textarea = document.getElementById("auto-adjust-textarea");
    if (textarea) {
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
      const rowsRequired = Math.ceil(textarea.scrollHeight / lineHeight);
      setRows(rowsRequired - 1);
    }
  }, []);
  return (
    <div className="text-white p-8 flex justify-around mx-6 mt-16">
      <div className=" w-1/3 flex-row justify-center items-center space-y-4">
        {" "}
        <img
          src="https://placekitten.com/150/150"
          alt="Profile"
          className="h-96 w-96 rounded-full p-3 mx-auto"
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold">{username}</h2>
          <h2 className="text-2xl font-bold">{name}</h2>
          <div className="m-2">
            <textarea
              id="auto-adjust-textarea"
              className="form-input px-4 py-2 rounded-md bg-primary text-white text-center"
              disabled={true}
              value={bio}
              rows={rows}
              cols="50"
            ></textarea>
          </div>
        </div>
        <div className="items-center flex justify-around">
          {linkedin !== "" && (
            <a
              href="https://www.linkedin.com/in/your-linkedin-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-white text-white hover:text-black py-2 px-4 rounded mb-2"
            >
              LinkedIn
            </a>
          )}
          {portfolio !== "" && (
            <a
              href="https://www.linkedin.com/in/your-linkedin-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-white text-white hover:text-black py-2 px-4 rounded mb-2"
            >
              Portfolio
            </a>
          )}
        </div>
      </div>
      <div className=" bg-gray-800 w-2/3 ">
        {location.pathname === "/repos" ? (
          <RepoList />
        ) : readme === "" ? (
          <div className="flex items-center justify-center w-full h-full text-center">
            <div className="flex-row">

            <div className=" text-3xl font-bold mb-4">
            Please create a readme file.
            </div>
            <div>
            <button onClick={()=>{
              setmodal(true);
            }}
            
            className="bg-blue-500 text-white py-2 px-4 rounded">Create Readme</button>
            </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full bg-gray-800  p-4">{readme}</div>
        )}
      </div>
      {modal && <Modal setmod={setmodal} />}
    </div>
  );
};

export default ProfilePage;
