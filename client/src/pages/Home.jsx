import React, { useState, useEffect, useContext } from "react";
import Modal from "../components/Modal";
import Context from "../ContextAPI";
import RepoList from "../components/RepoList";
const ProfilePage = () => {
  const context = useContext(Context);
  const [modal, setmodal] = useState(false);
  const [rows, setRows] = useState(1);
  const { name, username, bio, linkedin, portfolio, readme } =
    context.user_details;//handle the readme properly 
  useEffect(() => {
    const textarea = document.getElementById("auto-adjust-textarea");
    if (textarea) {
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
      const rowsRequired = Math.ceil(textarea.scrollHeight / lineHeight);
      setRows(rowsRequired - 1);
    }
  }, []);
  return (
    <div className="text-white p-8 flex justify-around mx-6">
      <div className=" border-2 border-white w-1/3 flex-row justify-center items-center space-y-4">
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
      <div className=" border-2 border-white w-2/3 ">
       <RepoList/>
      </div>
      {modal && (
        <Modal
          setmod={setmodal}
          readme={readme}
        />
      )}
    </div>
  );
};

export default ProfilePage;
