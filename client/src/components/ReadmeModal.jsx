import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Context from "../ContextAPI";

export default function Modal({ setmod }) {
  const context=useContext(Context)
  const [reader, setreader] = useState("");
  const handleInputChange = (event) => {
    setreader(event.target.value);
  };
  const handleSave = async () => {
    const response = await axios.post("http://localhost:5000/profile/readme", {
      userId:context.user_details.key,
      readme: reader,
    });
    console.log(response);
    await context.setuser_details((prevState) => ({
      ...prevState,
      readme: reader
    }));
    setreader(null);
    setmod(false);
  };
  const handleClose = () => {
    setreader(null);
    setmod(false);
  };
  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
          <div className="relative  my-6 mx-auto max-w-3xl bg-gray-700 p-5  rounded-lg w-1/2 text-text-col">
            <div className="text-3xl font-extrabold text-center mb-4">
              Add Readme
            </div>
            <textarea
              name="bio"
              id="inputBio"
              className="form-input w-full px-4 py-2 rounded-md bg-gray-800 text-white"
              value={reader}
              onChange={handleInputChange}
              rows="25"
            ></textarea>
            <div className="flex justify-center mt-4 space-x-8">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
}
