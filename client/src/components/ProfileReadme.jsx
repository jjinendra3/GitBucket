import React from "react";

function ProfileReadme() {
  return (
    <div>
      {" "}
      {readme === "" ? (
        <div
          className="h-full w-full bg-gray-800  p-4"
          dangerouslySetInnerHTML={{ __html: readme }}
        ></div>
      ) : (
        <div className="h-full w-full bg-gray-800  p-4 flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-white text-white hover:text-black py-2 px-4 rounded mb-2"
            onClick={() => {
              setmodal(true);
            }}
          >
            Add Readme
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileReadme;
