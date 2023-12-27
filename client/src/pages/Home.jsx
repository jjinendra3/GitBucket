import React, { useState,useEffect } from "react";
import Modal from '../components/Modal'
const ProfilePage = () => {
  const [hasReadme, sethasReadme] = useState(false);
  const [modal, setmodal] = useState(false);
  const linkedin = "s";
  const portfolio = "null";
  const [readme, setreadme] = useState("");
  const [rows, setRows] = useState(1);
  const content="dej";
  useEffect(() => {
    const textarea = document.getElementById('auto-adjust-textarea');
    if (textarea) {
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
      const rowsRequired = Math.ceil(textarea.scrollHeight / lineHeight);
      setRows(rowsRequired-1);
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
          <h2 className="text-2xl font-bold">John Doe</h2>
          <div className="m-2">
          <textarea
      id="auto-adjust-textarea"
      className="form-input px-4 py-2 rounded-md bg-primary text-white text-center"
      disabled={true}
      value={content}
      rows={rows}
      cols="50"
    ></textarea>
          </div>
        </div>
        <div className="items-center flex justify-around">
          {linkedin && (
            <a
              href="https://www.linkedin.com/in/your-linkedin-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-white text-white hover:text-black py-2 px-4 rounded mb-2"
            >
              LinkedIn
            </a>
          )}
          {portfolio && (
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
        {hasReadme?<div className="h-full w-full bg-gray-800  p-4" dangerouslySetInnerHTML={{ __html: readme }}>
          {/* <pre>{readme}
          </pre> */}
        </div>:<div className="h-full w-full bg-gray-800  p-4 flex justify-center items-center"><button 
        className="bg-blue-500 hover:bg-white text-white hover:text-black py-2 px-4 rounded mb-2" onClick={()=>{
          setmodal(true);
        }}>Add Readme</button></div>}
      </div>
      {modal && <Modal setmod={setmodal} setreadme={setreadme} readme={readme} sethasReadme={sethasReadme}/>}
    </div>
  );
};

export default ProfilePage;
